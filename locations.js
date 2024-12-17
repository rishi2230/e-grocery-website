document.addEventListener('DOMContentLoaded', () => {

    const locationsList = document.getElementById('locations-list');
    const searchInput = document.getElementById('location-search');
    const searchBtn = document.getElementById('search-btn');

    function renderLocations(locationsToRender) {
        locationsList.innerHTML = '';
        locationsToRender.forEach(location => {
            const locationItem = document.createElement('div');
            locationItem.className = 'location-item';
            locationItem.innerHTML = `
                <h3>${location.name}</h3>
                <p><strong>Address:</strong> ${location.address}</p>
                <p><strong>Phone:</strong> ${location.phone}</p>
                <p><strong>Hours:</strong> ${location.hours}</p>
                <a href="https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(location.address)}" class="directions" target="_blank">Get Directions</a>
            `;
            locationsList.appendChild(locationItem);
        });
    }

    renderLocations(locations);

    searchBtn.addEventListener('click', () => {
        const searchTerm = searchInput.value.toLowerCase();
        const filteredLocations = locations.filter(location => 
            location.name.toLowerCase().includes(searchTerm) || 
            location.address.toLowerCase().includes(searchTerm)
        );
        renderLocations(filteredLocations);
    });

    searchInput.addEventListener('keyup', (e) => {
        if (e.key === 'Enter') {
            searchBtn.click();
        }
    });
});