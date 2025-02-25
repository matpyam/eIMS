/*
<nav aria-label="breadcrumb">
    <ol class="breadcrumb">
        <li class="breadcrumb-item" data-menu="maintenance"><a href="#">Maintenance</a></li>
        <li class="breadcrumb-item active" aria-current="page" data-menu="user">User</li>
    </ol>
</nav>
*/
$(document).ready(function() {
    // Menu Items Configuration
    const menuItems = [
        {
            id: 'dashboard',
            icon: '<i class="fas fa-tachometer-alt"></i>',
            label: 'Dashboard',
            url: '#'
        },
        {
            id: 'maintenance',
            icon: '<i class="fas fa-wrench"></i>',
            label: 'Maintenance',
            children: [
                {
                    id: 'user',
                    icon: '<i class="fas fa-user"></i>',
                    label: 'User',
                    url: 'user-list.html'
                },
                {
                    id: 'gooditem',
                    icon: '<i class="fas fa-box-open"></i>',
                    label: 'Goods',
                    url: 'gooditem-list.html'
                },
                {
                    id: 'supplier',
                    icon: '<i class="fas fa-truck"></i>',
                    label: 'Supplier',
                    url: 'supplier-list.html'
                },
                {
                    id: 'customer',
                    icon: '<i class="fas fa-user-tie"></i>',
                    label: 'Customer',
                    url: 'customer-list.html'
                }
            ]
        },
        {
            id: 'stockitem',
            icon: '<i class="fas fa-cubes"></i>',
            label: 'Stock',
            url: 'stockitem-list.html'
        },
        {
            id: 'purchaseorder',
            icon: '<i class="fas fa-file-invoice-dollar"></i>',
            label: 'Purchase Order',
            url: 'purchaseorder-list.html'
        },
        {
            id: 'logout',
            icon: '<i class="fas fa-sign-out-alt"></i>',
            label: 'Logout',
            url: 'logout.php'
        }
    ];

    // Sidebar Manager
    class SidebarManager {
        constructor() {
            this.sidebar = $('#sidebar');
            this.menu = $('#menu');
            this.contentContainer = $('.content-container');
            this.expandedItems = new Set();
            
            this.init();
        }

        init() {
            this.renderMenu();
            this.setupEventListeners();
            
            // Load saved state
            if (localStorage.getItem('sidebarCollapsed') === 'true') {
                this.toggleSidebar();
            }

            // Add staff name and role to sidebar
            const $staffInfo = $('<div>').addClass('staff-info');
            $staffInfo.append(
                $('<span>').text('Admin'),
                $('<span>').text(' - Admin')
            );
            this.sidebar.append($staffInfo);
        }

        setupEventListeners() {
            $('#toggleSidebar').on('click', () => this.toggleSidebar());
        }

        toggleSidebar() {
            this.sidebar.toggleClass('collapsed');
            if (!window.matchMedia('(max-width: 768px)').matches) {
                this.contentContainer.css('margin-left', 
                    this.sidebar.hasClass('collapsed') ? '60px' : '250px'
                );
            }
            localStorage.setItem('sidebarCollapsed', this.sidebar.hasClass('collapsed'));
            if (this.sidebar.hasClass('collapsed')) {
                $('.staff-info').hide();
            } else {
                $('.staff-info').show();
            }
        }

        createMenuItem(item, level = 0) {
            const hasChildren = item.children && item.children.length > 0;
            const $li = $('<li>').addClass(`menu-item level-${level}`);
            
            const $content = $('<div>')
                .addClass('menu-item-content')
                .append(
                    $('<span>').addClass('icon').html(item.icon),
                    $('<span>').addClass('label').text(item.label)
                );

            if (hasChildren) {
                $content.append(
                    $('<span>')
                        .addClass('chevron')
                        .html('<i class="fas fa-chevron-right"></i>')
                );

                const $submenu = $('<ul>').addClass('submenu');
                item.children.forEach(child => {
                    $submenu.append(this.createMenuItem(child, level + 1));
                });

                $content.on('click', (e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    this.toggleSubmenu($content, $submenu);
                });

                $li.append($content, $submenu);
            } else {
                $content.on('click', () => {
                    if (item.url) {
                        window.location.href = item.url;
                    }
                });
                $li.append($content);
            }

            return $li;
        }

        toggleSubmenu($content, $submenu) {
            const isExpanded = $submenu.hasClass('expanded');
            const $chevron = $content.find('.chevron i');
            
            if (isExpanded) {
                $submenu.removeClass('expanded');
                $chevron.removeClass('fa-chevron-down').addClass('fa-chevron-right');
            } else {
                $submenu.addClass('expanded');
                $chevron.removeClass('fa-chevron-right').addClass('fa-chevron-down');
            }
        }

        renderMenu() {
            this.menu.empty();
            menuItems.forEach(item => {
                this.menu.append(this.createMenuItem(item));
            });
        }
    }
    // Initialize Sidebar
    new SidebarManager();

});