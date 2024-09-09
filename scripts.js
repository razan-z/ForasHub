// Sample data with more detailed information
const events = [
    {
        "id": 1,
        "title": "Entrepreneurship and Design Thinking",
        "type": "workshop",
        domain: "Entrepreneurship",
        "date": "2024-08-22",
        "cost": "free",
        "price": "مجاني",
        "description": "ورشة عمل مجانية عبر الإنترنت لطلاب الجامعة اللبنانية في الجنوب لتطوير وتمويل أفكار المشاريع مع شهادة من اليونيسف",
        "details": "لطلاب الجامعة اللبنانية في الجنوب من مختلف الجنسيات. هل عمركم بين ١٨ و ٢٨ سنة؟ ولديكم فكرة مشروع ترغبون في بلورتها وتطويرها وينقصكم التمويل للانطلاق بها؟ إلى أصحاب الأفكار الريادية، إنها فرصتكم لتحويل الفكرة إلى مشروع وذلك من خلال سلسلة الورش التدريبية التي ننظمها، والتي ستمكنكم من عرض فكرتكم وطرحها على خبراء لكسب فرصة تمويلها والبدء في تنفيذ المشروع. إن كانت فكرتكم تندرج ضمن: Education and learning skills (التدريس - التوجيه - الصحة النفسية - التعليم المستمر - دروس الترفيه...)",
        "prerequisites": "العمر بين 18 و 28 سنة",
        "outcomes": [
            "تطوير وصقل أفكار المشاريع",
            "الحصول على رؤى من الخبراء حول تطوير المشاريع",
            "فرصة لتأمين تمويل للمشاريع"
        ],
        "instructor": "",
        "provider": "UNICEF",
        "photo": "eventPhoto/1.png",
    },
    {
        id: 2,
        title: "Entrepreneurship Program",
        "type": "workshop",
        description: "Entrepreneurship Program to explore Design Thinking and Business Development with mandatory sessions.",
        details: `Lebanese University Students, from all nationalities, in Beirut, aged 18-28, It’s time for your dream to come true!
    Join us with your ideas in our "Entrepreneurship Program”.
    4 days Design Thinking / 3 hours per day / In LU Hadath – Faculty of Sciences
    8 days Business Development / 3 hours per day / Online
    - Attending all days sessions is mandatory
    - Certificates Available & Transportation is provided
    ❗ Limited Seats ❗
    You will be contacted before the sessions to confirm your attendance.`,
        prerequisites: "18-28 years old - Lebanese University Students",
        date: "2024-09-15",
        time: "09:00 AM - 12:00 PM",
        location: "LU Hadath – Faculty of Sciences, Online",
        image: "eventPhoto/2.png",
        cost: "free",
        domain: "Entrepreneurship",
        photo: "eventPhoto/2.png"
    },
    {
        id: 3,
        title: "Data Science Webinar",
        type: "webinar",
        domain: "data science",
        date: "2024-08-30",
        cost: "paid",
        price: "$99",
        description: "An introductory webinar on data science concepts and applications.",
        details: "This webinar will cover data analysis, machine learning, and how to use Python for data science.",
        prerequisites: "Basic understanding of programming.",
        outcomes: [
            "Perform basic data analysis using Python.",
            "Understand machine learning algorithms.",
            "Apply data science techniques to real-world problems."
        ],
        instructor: "Michael Lee",
        provider: "DataScience Institute",
        "photo": "eventPhoto/3.png",
    }
];

// Function to load events into the events page
function loadEvents(eventsToLoad = events) {
    const eventList = document.getElementById('event-list');
    eventList.innerHTML = '<div class="spinner"></div>'; // Show loading spinner

    // Simulate API call delay
    setTimeout(() => {
        eventList.innerHTML = ''; // Clear spinner

        if (eventsToLoad.length === 0) {
            eventList.innerHTML = '<p>No events found matching the selected filters.</p>';
            return;
        }

        eventsToLoad.forEach((event, index) => {
            const card = document.createElement('div');
            card.classList.add('col-md-4');
            card.innerHTML = `
                <div class="card mb-4" style="opacity: 0; transform: translateY(20px);">
                    <img src="${event.photo}" class="card-img-top" alt="${event.title}" style="height: 200px; object-fit: cover;">
                    <div class="card-body">
                        <h5 class="card-title">${event.title}</h5>
                        <p class="card-text">${event.description}</p>
                        <a href="event-details.html?id=${event.id}" class="btn btn-primary">View Details</a>
                    </div>
                </div>
            `;
            eventList.appendChild(card);

            // Animate card entrance
            setTimeout(() => {
                card.querySelector('.card').style.opacity = '1';
                card.querySelector('.card').style.transform = 'translateY(0)';
            }, index * 100);
        });
    }, 1000); // Simulated 1-second delay
}

// Function to filter events based on search query
function searchEvents(query) {
    const filteredEvents = events.filter(event => event.title.toLowerCase().includes(query.toLowerCase()));
    loadEvents(filteredEvents);
}

// Function to load event details
function loadEventDetails() {
    const urlParams = new URLSearchParams(window.location.search);
    const eventId = urlParams.get('id');
    const event = events.find(e => e.id === parseInt(eventId));

    if (event) {
        document.getElementById('event-title').textContent = event.title;
        document.getElementById('event-date').textContent = `Date: ${event.date}`;
        document.getElementById('event-cost').textContent = event.cost === 'free' ? 'Free' : event.price;
        document.getElementById('event-description').textContent = event.description;
        document.getElementById('event-prerequisites').textContent = event.prerequisites;
        document.getElementById('event-details').innerHTML = event.details.join('<br>');
        document.getElementById('event-instructor').textContent = event.instructor;
        document.getElementById('event-provider').textContent = event.provider;

        const outcomesList = document.getElementById('event-outcomes');
        outcomesList.innerHTML = '';
        event.outcomes.forEach(outcome => {
            const li = document.createElement('li');
            li.className = 'list-group-item';
            li.textContent = outcome;
            outcomesList.appendChild(li);
        });

        // Set event photo
        document.getElementById('event-photo').src = event.photo;
    } else {
        document.getElementById('event-details').innerHTML = '<p>Event not found.</p>';
    }
}

// Load events or event details based on the current page
if (window.location.pathname.includes('events.html')) {
    populateFilters();
    loadEvents();

    // Add event listeners for filter buttons
    document.getElementById('apply-filters').addEventListener('click', applyFilters);
    document.getElementById('reset-filters').addEventListener('click', resetFilters);

    // Add event listener for search button
    document.getElementById('search-button').addEventListener('click', () => {
        const query = document.getElementById('search-input').value;
        searchEvents(query);
    });

    // Add event listener for search input (optional: live search)
    document.getElementById('search-input').addEventListener('input', () => {
        const query = document.getElementById('search-input').value;
        searchEvents(query);
    });
} else if (window.location.pathname.includes('event-details.html')) {
    loadEventDetails();
}

// Add smooth scrolling to all links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Function to populate filter options
function populateFilters() {
    const typeFilters = document.getElementById('type-filters');
    const domainFilters = document.getElementById('domain-filters');
    const costFilters = document.getElementById('cost-filters');

    const types = [...new Set(events.map(event => event.type))];
    const domains = [...new Set(events.map(event => event.domain))];
    const costs = [...new Set(events.map(event => event.cost))];

    types.forEach(type => {
        typeFilters.innerHTML += `
            <div class="form-check">
                <input class="form-check-input" type="checkbox" value="${type}" id="${type}-filter">
                <label class="form-check-label" for="${type}-filter">${type}</label>
            </div>
        `;
    });

    domains.forEach(domain => {
        domainFilters.innerHTML += `
            <div class="form-check">
                <input class="form-check-input" type="checkbox" value="${domain}" id="${domain}-filter">
                <label class="form-check-label" for="${domain}-filter">${domain}</label>
            </div>
        `;
    });

    costs.forEach(cost => {
        costFilters.innerHTML += `
            <div class="form-check">
                <input class="form-check-input" type="checkbox" value="${cost}" id="${cost}-filter">
                <label class="form-check-label" for="${cost}-filter">${cost}</label>
            </div>
        `;
    });
}

// Function to apply selected filters
function applyFilters() {
    const selectedTypes = Array.from(document.querySelectorAll('#type-filters input:checked')).map(el => el.value);
    const selectedDomains = Array.from(document.querySelectorAll('#domain-filters input:checked')).map(el => el.value);
    const selectedCosts = Array.from(document.querySelectorAll('#cost-filters input:checked')).map(el => el.value);

    const filteredEvents = events.filter(event =>
        (selectedTypes.length === 0 || selectedTypes.includes(event.type)) &&
        (selectedDomains.length === 0 || selectedDomains.includes(event.domain)) &&
        (selectedCosts.length === 0 || selectedCosts.includes(event.cost))
    );

    loadEvents(filteredEvents);
}

// Function to reset filters
function resetFilters() {
    document.querySelectorAll('#type-filters input').forEach(el => el.checked = false);
    document.querySelectorAll('#domain-filters input').forEach(el => el.checked = false);
    document.querySelectorAll('#cost-filters input').forEach(el => el.checked = false);

    loadEvents();
}
