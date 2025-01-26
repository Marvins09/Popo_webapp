document.addEventListener('DOMContentLoaded', () => {
    // Fetch and display dashboard metrics
    fetch('/api/admin/metrics')
        .then(response => response.json())
        .then(data => {
            document.getElementById('monthly-revenue').textContent = `KES ${data.monthlyRevenue}`;
            document.getElementById('successful-payments').textContent = data.successfulPayments;
            document.getElementById('total-orders').textContent = data.totalOrders;
            document.getElementById('pending-orders').textContent = data.pendingOrders;
        })
        .catch(error => console.error('Error fetching metrics:', error));

    // Track order
    document.getElementById('track-order-form').addEventListener('submit', (event) => {
        event.preventDefault();
        const orderId = document.getElementById('order-id').value;
        fetch(`/api/orders/${orderId}`)
            .then(response => response.json())
            .then(data => {
                document.getElementById('order-status').textContent = `Order Status: ${data.status}`;
            })
            .catch(error => console.error('Error tracking order:', error));
    });

    // View all users
    document.getElementById('view-users').addEventListener('click', () => {
        fetch('/api/admin/users')
            .then(response => response.json())
            .then(data => {
                const userList = document.getElementById('user-list');
                userList.innerHTML = '';
                data.users.forEach(user => {
                    const userItem = document.createElement('div');
                    userItem.textContent = `${user.username} (${user.email})`;
                    userList.appendChild(userItem);
                });
            })
            .catch(error => console.error('Error fetching users:', error));
    });

    // WebSocket for real-time updates
    const socket = new WebSocket('ws://your-websocket-server-url');
    socket.addEventListener('message', (event) => {
        const data = JSON.parse(event.data);
        if (data.type === 'metricsUpdate') {
            document.getElementById('monthly-revenue').textContent = `KES ${data.monthlyRevenue}`;
            document.getElementById('successful-payments').textContent = data.successfulPayments;
            document.getElementById('total-orders').textContent = data.totalOrders;
            document.getElementById('pending-orders').textContent = data.pendingOrders;
        }
    });
});