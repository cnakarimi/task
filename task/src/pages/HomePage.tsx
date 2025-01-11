import React, { useState, useEffect } from "react";

const HomePage: React.FC = () => {
    const [name, setName] = useState<string>(""); // Name state
    const [currentTime, setCurrentTime] = useState<string>(""); // Current time state
    const [greeting, setGreeting] = useState<string>(""); // Greeting state

    useEffect(() => {
        // Function to update time and greeting
        const updateTimeAndGreeting = () => {
            const now = new Date();
            setCurrentTime(now.toLocaleTimeString());

            const hour = now.getHours();
            if (hour < 12) {
                setGreeting("Good morning");
            } else if (hour === 12) {
                setGreeting("Good noon");
            } else if (hour < 18) {
                setGreeting("Good afternoon");
            } else if (hour < 21) {
                setGreeting("Good evening");
            } else {
                setGreeting("Good night");
            }
        };

        // Update every second
        updateTimeAndGreeting();
        const interval = setInterval(updateTimeAndGreeting, 1000);

        // Clean up interval
        return () => clearInterval(interval);
    }, []);

    const handleSave = () => {
        if (name.trim()) {
            localStorage.setItem("userName", name);
            setName(""); // Clear the input field
            window.location.reload(); // Reload the page
        } else {
            alert("Please enter a valid name.");
        }
    };

    const savedName = localStorage.getItem("userName");

    return (
        <div className="flex flex-col items-center p-4">
            <h1 className="text-2xl font-bold mb-2">
                {greeting}{savedName ? `, ${savedName.charAt(0).toUpperCase() + savedName.slice(1).toLowerCase()}` : " ,Guest"}!
            </h1>
            <h2 className="text-lg mb-4">Current Time: {currentTime}</h2>
            {!savedName ? (
                <>
                    <label htmlFor="nameInput" className="mb-2 text-lg font-medium">
                        Enter your name:
                    </label>
                    <input
                        id="nameInput"
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Your name"
                        className="p-2 border rounded-md w-64 mb-4"
                    />
                    <button
                        onClick={handleSave}
                        className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                    >
                        Save Name
                    </button>
                </>
            ) : null}
        </div>
    );
};

export default HomePage;
