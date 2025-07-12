#!/bin/bash

# 🛡️ KRAVINGS CLUB - PORT MANAGEMENT & FIREWALL CONFIGURATION
# OPERATION KRAVINGS DOMINATION - SECURITY HARDENING

set -e

echo "🏰 KRAVINGS CLUB SECURITY HARDENING INITIATED"
echo "================================================"

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Environment detection
ENVIRONMENT=${NODE_ENV:-development}

echo -e "${BLUE}Environment: ${ENVIRONMENT}${NC}"

# Function to check if running as root
check_root() {
    if [[ $EUID -eq 0 ]]; then
        echo -e "${GREEN}✅ Running as root - proceeding with security configuration${NC}"
    else
        echo -e "${RED}❌ This script requires root privileges${NC}"
        echo "Please run with sudo: sudo ./port-management.sh"
        exit 1
    fi
}

# Function to backup current firewall rules
backup_firewall() {
    echo -e "${BLUE}📦 Backing up current firewall rules...${NC}"
    
    if command -v ufw &> /dev/null; then
        ufw status > /tmp/ufw_backup_$(date +%Y%m%d_%H%M%S).txt
        echo -e "${GREEN}✅ UFW rules backed up${NC}"
    fi
    
    if command -v iptables &> /dev/null; then
        iptables-save > /tmp/iptables_backup_$(date +%Y%m%d_%H%M%S).rules
        echo -e "${GREEN}✅ iptables rules backed up${NC}"
    fi
}

# Function to configure UFW (Uncomplicated Firewall)
configure_ufw() {
    echo -e "${BLUE}🔥 Configuring UFW firewall...${NC}"
    
    # Reset UFW to defaults
    ufw --force reset
    
    # Default policies
    ufw default deny incoming
    ufw default allow outgoing
    
    # Allow SSH (with rate limiting)
    ufw limit ssh comment 'SSH with rate limiting'
    
    # Allow HTTP (for redirects to HTTPS)
    ufw allow 80/tcp comment 'HTTP for HTTPS redirects'
    
    # Allow HTTPS
    ufw allow 443/tcp comment 'HTTPS for secure web traffic'
    
    # Environment-specific rules
    if [[ "$ENVIRONMENT" == "development" ]]; then
        echo -e "${YELLOW}⚠️ Development environment - allowing additional ports${NC}"
        ufw allow 3000/tcp comment 'Next.js development server'
        ufw allow 5173/tcp comment 'Vite development server'
        ufw allow 8080/tcp comment 'Alternative HTTP dev'
    fi
    
    # Block commonly abused ports
    echo -e "${BLUE}🚫 Blocking commonly abused ports...${NC}"
    
    # Block FTP
    ufw deny 21/tcp comment 'Block FTP'
    
    # Block Telnet
    ufw deny 23/tcp comment 'Block Telnet'
    
    # Block SMTP (unless needed)
    ufw deny 25/tcp comment 'Block SMTP'
    
    # Block POP3/IMAP (unless needed)
    ufw deny 110/tcp comment 'Block POP3'
    ufw deny 143/tcp comment 'Block IMAP'
    
    # Block database ports (external access)
    ufw deny 3306/tcp comment 'Block MySQL external access'
    ufw deny 5432/tcp comment 'Block PostgreSQL external access'
    ufw deny 27017/tcp comment 'Block MongoDB external access'
    ufw deny 6379/tcp comment 'Block Redis external access'
    
    # Enable UFW
    ufw --force enable
    
    echo -e "${GREEN}✅ UFW firewall configured successfully${NC}"
}

# Function to configure iptables (alternative to UFW)
configure_iptables() {
    echo -e "${BLUE}🔥 Configuring iptables firewall...${NC}"
    
    # Flush existing rules
    iptables -F
    iptables -X
    iptables -t nat -F
    iptables -t nat -X
    iptables -t mangle -F
    iptables -t mangle -X
    
    # Set default policies
    iptables -P INPUT DROP
    iptables -P FORWARD DROP
    iptables -P OUTPUT ACCEPT
    
    # Allow loopback
    iptables -A INPUT -i lo -j ACCEPT
    iptables -A OUTPUT -o lo -j ACCEPT
    
    # Allow established connections
    iptables -A INPUT -m conntrack --ctstate ESTABLISHED,RELATED -j ACCEPT
    
    # Allow SSH with rate limiting
    iptables -A INPUT -p tcp --dport 22 -m conntrack --ctstate NEW -m limit --limit 2/min --limit-burst 2 -j ACCEPT
    
    # Allow HTTP
    iptables -A INPUT -p tcp --dport 80 -j ACCEPT
    
    # Allow HTTPS
    iptables -A INPUT -p tcp --dport 443 -j ACCEPT
    
    # Development environment ports
    if [[ "$ENVIRONMENT" == "development" ]]; then
        iptables -A INPUT -p tcp --dport 3000 -j ACCEPT
        iptables -A INPUT -p tcp --dport 5173 -j ACCEPT
        iptables -A INPUT -p tcp --dport 8080 -j ACCEPT
    fi
    
    # Block common attack ports
    iptables -A INPUT -p tcp --dport 21 -j DROP    # FTP
    iptables -A INPUT -p tcp --dport 23 -j DROP    # Telnet
    iptables -A INPUT -p tcp --dport 25 -j DROP    # SMTP
    iptables -A INPUT -p tcp --dport 3306 -j DROP  # MySQL
    iptables -A INPUT -p tcp --dport 5432 -j DROP  # PostgreSQL
    iptables -A INPUT -p tcp --dport 27017 -j DROP # MongoDB
    
    # Save rules (Ubuntu/Debian)
    if command -v netfilter-persistent &> /dev/null; then
        netfilter-persistent save
    elif command -v iptables-save &> /dev/null; then
        iptables-save > /etc/iptables/rules.v4
    fi
    
    echo -e "${GREEN}✅ iptables firewall configured successfully${NC}"
}

# Function to configure fail2ban
configure_fail2ban() {
    echo -e "${BLUE}🛡️ Configuring fail2ban...${NC}"
    
    if ! command -v fail2ban-server &> /dev/null; then
        echo -e "${YELLOW}⚠️ fail2ban not installed. Installing...${NC}"
        apt-get update
        apt-get install -y fail2ban
    fi
    
    # Create custom jail configuration
    cat > /etc/fail2ban/jail.local << EOF
[DEFAULT]
bantime = 3600
findtime = 600
maxretry = 3

[sshd]
enabled = true
port = ssh
filter = sshd
logpath = /var/log/auth.log
maxretry = 3

[nginx-http-auth]
enabled = true
filter = nginx-http-auth
port = http,https
logpath = /var/log/nginx/error.log

[nginx-limit-req]
enabled = true
filter = nginx-limit-req
port = http,https
logpath = /var/log/nginx/error.log
maxretry = 10

[nginx-botsearch]
enabled = true
filter = nginx-botsearch
port = http,https
logpath = /var/log/nginx/access.log
maxretry = 2
EOF
    
    # Restart fail2ban
    systemctl restart fail2ban
    systemctl enable fail2ban
    
    echo -e "${GREEN}✅ fail2ban configured successfully${NC}"
}

# Function to secure SSH
secure_ssh() {
    echo -e "${BLUE}🔐 Securing SSH configuration...${NC}"
    
    # Backup original SSH config
    cp /etc/ssh/sshd_config /etc/ssh/sshd_config.backup.$(date +%Y%m%d)
    
    # Configure SSH security settings
    sed -i 's/#PermitRootLogin yes/PermitRootLogin no/' /etc/ssh/sshd_config
    sed -i 's/#PasswordAuthentication yes/PasswordAuthentication no/' /etc/ssh/sshd_config
    sed -i 's/#PubkeyAuthentication yes/PubkeyAuthentication yes/' /etc/ssh/sshd_config
    sed -i 's/#MaxAuthTries 6/MaxAuthTries 3/' /etc/ssh/sshd_config
    
    # Add custom security settings
    echo "" >> /etc/ssh/sshd_config
    echo "# Kravings Club Security Settings" >> /etc/ssh/sshd_config
    echo "Protocol 2" >> /etc/ssh/sshd_config
    echo "MaxStartups 2" >> /etc/ssh/sshd_config
    echo "LoginGraceTime 30" >> /etc/ssh/sshd_config
    echo "ClientAliveInterval 300" >> /etc/ssh/sshd_config
    echo "ClientAliveCountMax 2" >> /etc/ssh/sshd_config
    
    # Restart SSH service
    systemctl restart sshd
    
    echo -e "${GREEN}✅ SSH secured successfully${NC}"
}

# Function to check open ports
check_ports() {
    echo -e "${BLUE}🔍 Checking open ports...${NC}"
    
    if command -v netstat &> /dev/null; then
        echo -e "${BLUE}Active listening ports:${NC}"
        netstat -tlnp | grep LISTEN
    elif command -v ss &> /dev/null; then
        echo -e "${BLUE}Active listening ports:${NC}"
        ss -tlnp | grep LISTEN
    fi
    
    if command -v nmap &> /dev/null; then
        echo -e "${BLUE}External port scan:${NC}"
        nmap -sT -O localhost 2>/dev/null | grep -E '^[0-9]+/(tcp|udp)'
    fi
}

# Function to configure automatic security updates
configure_auto_updates() {
    echo -e "${BLUE}🔄 Configuring automatic security updates...${NC}"
    
    if command -v unattended-upgrades &> /dev/null; then
        # Enable automatic security updates
        echo 'Unattended-Upgrade::Automatic-Reboot "false";' > /etc/apt/apt.conf.d/20auto-upgrades-kravings
        echo 'Unattended-Upgrade::Remove-Unused-Dependencies "true";' >> /etc/apt/apt.conf.d/20auto-upgrades-kravings
        
        systemctl enable unattended-upgrades
        systemctl start unattended-upgrades
        
        echo -e "${GREEN}✅ Automatic security updates enabled${NC}"
    else
        echo -e "${YELLOW}⚠️ unattended-upgrades not available${NC}"
    fi
}

# Function to create security monitoring script
create_monitoring_script() {
    echo -e "${BLUE}📊 Creating security monitoring script...${NC}"
    
    cat > /usr/local/bin/kravings-security-monitor.sh << 'EOF'
#!/bin/bash
# Kravings Club Security Monitoring

LOG_FILE="/var/log/kravings-security.log"
DATE=$(date '+%Y-%m-%d %H:%M:%S')

echo "[$DATE] Security check started" >> $LOG_FILE

# Check for failed login attempts
FAILED_LOGINS=$(grep "Failed password" /var/log/auth.log | grep $(date '+%b %d') | wc -l)
if [ $FAILED_LOGINS -gt 10 ]; then
    echo "[$DATE] WARNING: $FAILED_LOGINS failed login attempts today" >> $LOG_FILE
fi

# Check for unusual network connections
CONNECTIONS=$(netstat -an | grep ESTABLISHED | wc -l)
if [ $CONNECTIONS -gt 100 ]; then
    echo "[$DATE] WARNING: $CONNECTIONS active connections" >> $LOG_FILE
fi

# Check disk space
DISK_USAGE=$(df / | tail -1 | awk '{print $5}' | sed 's/%//')
if [ $DISK_USAGE -gt 90 ]; then
    echo "[$DATE] WARNING: Disk usage at $DISK_USAGE%" >> $LOG_FILE
fi

echo "[$DATE] Security check completed" >> $LOG_FILE
EOF
    
    chmod +x /usr/local/bin/kravings-security-monitor.sh
    
    # Add to crontab
    (crontab -l 2>/dev/null; echo "0 */6 * * * /usr/local/bin/kravings-security-monitor.sh") | crontab -
    
    echo -e "${GREEN}✅ Security monitoring script created${NC}"
}

# Main execution
main() {
    echo -e "${GREEN}🏰 KRAVINGS CLUB SECURITY HARDENING${NC}"
    echo -e "${GREEN}Operation: Kravings Domination - Security Phase${NC}"
    echo ""
    
    # Check if running as root
    check_root
    
    # Backup current configuration
    backup_firewall
    
    # Configure firewall
    if command -v ufw &> /dev/null; then
        configure_ufw
    elif command -v iptables &> /dev/null; then
        configure_iptables
    else
        echo -e "${RED}❌ No firewall utility found${NC}"
        exit 1
    fi
    
    # Configure additional security
    configure_fail2ban
    secure_ssh
    configure_auto_updates
    create_monitoring_script
    
    # Check final port status
    check_ports
    
    echo ""
    echo -e "${GREEN}🎖️ SECURITY HARDENING COMPLETE!${NC}"
    echo -e "${GREEN}✅ Firewall configured${NC}"
    echo -e "${GREEN}✅ SSH secured${NC}"
    echo -e "${GREEN}✅ fail2ban enabled${NC}"
    echo -e "${GREEN}✅ Automatic updates enabled${NC}"
    echo -e "${GREEN}✅ Security monitoring active${NC}"
    echo ""
    echo -e "${BLUE}🛡️ Your Kravings Club platform is now hardened for production!${NC}"
    echo -e "${YELLOW}⚠️ Remember to:${NC}"
    echo -e "${YELLOW}   1. Test your application after these changes${NC}"
    echo -e "${YELLOW}   2. Configure SSL certificates${NC}"
    echo -e "${YELLOW}   3. Set up backup procedures${NC}"
    echo -e "${YELLOW}   4. Monitor security logs regularly${NC}"
}

# Execute main function
main "$@"