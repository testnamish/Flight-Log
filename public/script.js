// Client-side form validation and enhancement
document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('flightForm');
    
    if (form) {
        // Set minimum datetime to current time
        const scheduledDepartureInput = document.getElementById('scheduledDeparture');
        const now = new Date();
        now.setMinutes(now.getMinutes() - now.getTimezoneOffset());
        scheduledDepartureInput.min = now.toISOString().slice(0, 16);

        // Form submission validation
        form.addEventListener('submit', function(e) {
            const flightNumber = document.getElementById('flightNumber').value.trim();
            const origin = document.getElementById('origin').value.trim();
            const destination = document.getElementById('destination').value.trim();
            const scheduledDeparture = document.getElementById('scheduledDeparture').value;

            // Validate flight number format
            if (!/^[A-Z0-9]+$/.test(flightNumber)) {
                e.preventDefault();
                alert('Flight number should contain only uppercase letters and numbers');
                return false;
            }

            // Validate origin and destination are different
            if (origin.toLowerCase() === destination.toLowerCase()) {
                e.preventDefault();
                alert('Origin and Destination cannot be the same');
                return false;
            }

            // Validate departure time is in the future
            const departureDate = new Date(scheduledDeparture);
            const currentDate = new Date();
            
            if (departureDate <= currentDate) {
                e.preventDefault();
                alert('Scheduled departure must be in the future');
                return false;
            }

            // If all validations pass, show a brief loading state
            const submitButton = form.querySelector('button[type="submit"]');
            submitButton.textContent = 'Adding Flight...';
            submitButton.disabled = true;
        });

        // Auto-capitalize flight number
        const flightNumberInput = document.getElementById('flightNumber');
        flightNumberInput.addEventListener('input', function(e) {
            e.target.value = e.target.value.toUpperCase();
        });

        // Capitalize first letter of origin and destination
        const originInput = document.getElementById('origin');
        const destinationInput = document.getElementById('destination');

        function capitalizeFirstLetter(input) {
            input.addEventListener('blur', function(e) {
                const words = e.target.value.split(' ');
                const capitalized = words.map(word => {
                    if (word.length > 0) {
                        return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
                    }
                    return word;
                }).join(' ');
                e.target.value = capitalized;
            });
        }

        capitalizeFirstLetter(originInput);
        capitalizeFirstLetter(destinationInput);
    }
});
