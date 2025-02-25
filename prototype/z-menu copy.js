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
            id: 'inventory',
            icon: '<i class="fas fa-box"></i>',
            label: 'Inventory',
            children: [
                {
                    id: 'stockitem',
                    icon: '<i class="fas fa-cubes"></i>',
                    label: 'Stock',
                    url: 'stockitem-list.html'
                },
                {
                    id: 'grn',
                    icon: '<i class="fas fa-file-alt"></i>',
                    label: 'GRN',
                    children: [
                        {
                            id: 'grn-entry',
                            icon: '<i class="fas fa-plus-circle"></i>',
                            label: 'GRN Entry',
                            url: '#'
                        },
                        {
                            id: 'grn-list',
                            icon: '<i class="fas fa-list"></i>',
                            label: 'GRN List',
                            url: '#'
                        }
                    ]
                }
            ]
        },
        {
            id: 'reports',
            icon: '<i class="fas fa-chart-bar"></i>',
            label: 'Reports',
            url: '#'
        },
        {
            id: 'settings',
            icon: '<i class="fas fa-cog"></i>',
            label: 'Settings',
            url: '#'
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

    // GRN Form functionality

});