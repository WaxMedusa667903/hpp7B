// Unique identifier for each class
const classId = '7B'; // Change this to '7B', '8A', '8B' as needed

// Initialize points from localStorage or set to 0 if not present
const points = {
    gryffindor: localStorage.getItem(`${classId}_gryffindor`) ? parseInt(localStorage.getItem(`${classId}_gryffindor`)) : 0,
    slytherin: localStorage.getItem(`${classId}_slytherin`) ? parseInt(localStorage.getItem(`${classId}_slytherin`)) : 0,
    ravenclaw: localStorage.getItem(`${classId}_ravenclaw`) ? parseInt(localStorage.getItem(`${classId}_ravenclaw`)) : 0,
    hufflepuff: localStorage.getItem(`${classId}_hufflepuff`) ? parseInt(localStorage.getItem(`${classId}_hufflepuff`)) : 0,
    hogwarts: localStorage.getItem(`${classId}_hogwarts`) ? parseInt(localStorage.getItem(`${classId}_hogwarts`)) : 0
};

// Array to cycle through for increment options
const increments = [1, 10, 50, 100];
let currentIncrement = 1;
let currentIncrementIndex = 0;

// Function to update the display and save points to localStorage
function adjustPoints(house, amount) {
    points[house] += amount;
    document.getElementById(`${house}-points`).innerText = points[house];
    localStorage.setItem(`${classId}_${house}`, points[house]); // Save the updated points with class-specific key
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
