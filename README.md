🚀 SyncFleet
SyncFleet is a real-time group tracking and alert system designed for scenarios where multiple people or vehicles move together — like rides, deliveries, rescue missions, or group travels. The platform enables users to create or join rooms, share live locations, send alerts (including SOS), and detect anomalies such as when a member strays from the group or remains stationary too long.

🌟 Why SyncFleet?
Traditional tracking apps focus on individual location sharing. SyncFleet solves a group-level coordination problem:
Teams need to know not just where someone is, but also how they’re moving compared to the group.
In critical use cases (rescue, fleet management, school buses, travel groups), real-time anomalies matter — like if a member stops moving, deviates from the path, or triggers an SOS.
Communication is context-aware: location data is integrated with chat and alerts for seamless coordination.

🔑 Key Features
🗺️ Full-Screen Real-Time Map with live user markers.
📍 Unique pins & trails showing each user’s movement path.
📡 Live Socket Updates for location and chat.
🚨 SOS Alerts & Anomaly Detection (e.g., stationary too long, deviating from group).
💬 Room-Based Chat for quick coordination.
👥 User Panel showing active users, last-seen status, and SOS triggers.
🎨 Clean & Modern UI with Tailwind + ShadCN.

🛠️ Tech Stack
Frontend
React.js → component-based UI
TailwindCSS + ShadCN → responsive, modern styling
Leaflet.js → interactive maps, markers, trails
Socket.IO Client → real-time communication
LocalStorage / JWT → lightweight user/session management

Backend
Node.js + Express.js → REST API & server logic
Socket.IO → real-time event-driven communication
MongoDB → persistent storage for rooms, users, and logs
JWT Authentication → secure route & room access


⚙️ How It Works
User Authentication → Login/signup with email & password.
Room Creation / Join → Users can create new rooms or join existing ones.
Location Sharing → Devices send live GPS updates to the server.
Real-Time Updates → Socket.IO broadcasts new positions to all room members.
Anomaly Detection → System checks if a user is stationary too long or deviating.
Communication → In-room chat with alerts/SOS integration.

🚧 Future Enhancements
📱 Mobile app (React Native) with background location tracking
🧭 Smarter anomaly detection using ML (predict group paths)
🛡️ End-to-end encryption for chat & location
📊 Analytics dashboard for fleet admins



🤝 Contributing
Contributions are welcome! You can:
Open issues for bugs or feature requests
Submit PRs with fixes or improvements
Suggest better anomaly detection strategies
