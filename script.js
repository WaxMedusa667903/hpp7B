// Initialize points from localStorage or set to 0 if not present
const points = {
    gryffindor1: localStorage.getItem('gryffindor1') ? parseInt(localStorage.getItem('gryffindor1')) : 0,
    slytherin1: localStorage.getItem('slytherin1') ? parseInt(localStorage.getItem('slytherin1')) : 0,
    ravenclaw1: localStorage.getItem('ravenclaw1') ? parseInt(localStorage.getItem('ravenclaw1')) : 0,
    hufflepuff1: localStorage.getItem('hufflepuff1') ? parseInt(localStorage.getItem('hufflepuff1')) : 0,
    hogwarts1: localStorage.getItem('hogwarts1') ? parseInt(localStorage.getItem('hogwarts1')) : 0
};

// Array to cycle through for increment options
const increments = [1, 10, 50, 100];
let currentIncrement = 1;
let currentIncrementIndex = 0;

// Function to update the display and save points to localStorage
function adjustPoints(house, amount) {
    points[house] += amount;
    document.getElementById(`${house}-points`).innerText = points[house];
    localStorage.setItem(house, points[house]); // Save the updated points in localStorage
    updateLeaderboard(); // Update the leaderboard after points change
}

// Function to display the initial points when the page loads
function displayPoints() {
    for (let house in points) {
        document.getElementById(`${house}-points`).innerText = points[house];
    }
}

// Function to change the increment
function changeIncrement() {
    currentIncrementIndex = (currentIncrementIndex + 1) % increments.length;
    currentIncrement = increments[currentIncrementIndex];
    document.getElementById('current-increment').innerText = currentIncrement;
}

// Function to update the leaderboard
function updateLeaderboard() {
    let housesArray = Object.keys(points).map(house => ({
        name: house,
        score: points[house]
    }));

    // Sort the houses by score in descending order
    housesArray.sort((a, b) => b.score - a.score);

    // Update the leaderboard display
    const leaderboard = document.getElementById('house-leaderboard');
    leaderboard.innerHTML = housesArray.map(house => `<li>${capitalize(house.name)}: ${house.score} points</li>`).join('');
}

// Helper function to capitalize house names
function capitalize(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

// Call displayPoints to show the saved points when the page loads
displayPoints();
updateLeaderboard(); // Initialize the leaderboard on page load
