// Ensure the events data is available in this file as well
const events = [
    {
        id: 1,
        title: "Entrepreneurship and Design Thinking",
        type: "workshop",
        domain: "Entrepreneurship",
        date: "2024-08-22",
        cost: "free",
        price: "مجاني",
        description: "ورشة عمل مجانية عبر الإنترنت لطلاب الجامعة اللبنانية في الجنوب لتطوير وتمويل أفكار المشاريع مع شهادة من اليونيسف",
        details: "لطلاب الجامعة اللبنانية في الجنوب من مختلف الجنسيات. هل عمركم بين ١٨ و ٢٨ سنة؟ ولديكم فكرة مشروع ترغبون في بلورتها وتطويرها وينقصكم التمويل للانطلاق بها؟ إلى أصحاب الأفكار الريادية، إنها فرصتكم لتحويل الفكرة إلى مشروع وذلك من خلال سلسلة الورش التدريبية التي ننظمها، والتي ستمكنكم من عرض فكرتكم وطرحها على خبراء لكسب فرصة تمويلها والبدء في تنفيذ المشروع. إن كانت فكرتكم تندرج ضمن: Education and learning skills (التدريس - التوجيه - الصحة النفسية - التعليم المستمر - دروس الترفيه...)",
        prerequisites: `العمر بين 18 و 28 سنة
        طلاب الجامعة اللبنانية في الجنوب`,
        outcomes: [
            "تطوير وصقل أفكار المشاريع",
            "الحصول على رؤى من الخبراء حول تطوير المشاريع",
            "فرصة لتأمين تمويل للمشاريع"
        ],
        instructor: "",
        provider: "UNICEF, GIL",
        photo: "eventPhoto/1.png"
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
        provider: "UNICEF, GIL",
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


// Function to load event details
function loadEventDetails() {
    const urlParams = new URLSearchParams(window.location.search);
    const eventId = urlParams.get('id');
    const event = events.find(e => e.id === parseInt(eventId, 10));

    if (event) {
        document.getElementById('event-title').textContent = event.title;
        document.getElementById('event-date').textContent = `Date: ${event.date}`;
        document.getElementById('event-cost').textContent = event.cost === 'free' ? 'Free' : event.price;
        document.getElementById('event-description').textContent = event.description;
        document.getElementById('event-prerequisites').textContent = event.prerequisites || 'N/A';
        document.getElementById('event-details').innerHTML = event.details.replace(/\n/g, '<br>');
        // document.getElementById('event-instructor').textContent = event.instructor || 'N/A';
        document.getElementById('event-provider').textContent = event.provider;
        document.getElementById('event-photo').src = event.photo;

        const outcomesList = document.getElementById('event-outcomes');
        outcomesList.innerHTML = '';
        event.outcomes.forEach(outcome => {
            const li = document.createElement('li');
            li.className = 'list-group-item';
            li.textContent = outcome;
            outcomesList.appendChild(li);
        });
    } else {
        document.getElementById('event-details').innerHTML = '<p>Event not found.</p>';
    }
}

// Photo popup function
function openPhotoPopup() {
    const photoSrc = document.getElementById('event-photo').src;
    document.getElementById('modalPhoto').src = photoSrc;
    const photoModal = new bootstrap.Modal(document.getElementById('photoModal'));
    photoModal.show();
}

// Load event details when the page is ready
document.addEventListener('DOMContentLoaded', loadEventDetails);


// Load event details dynamically from JavaScript
document.addEventListener('DOMContentLoaded', function () {
    // Code to dynamically load event details
    loadEventDetails();
});

// Photo modal functionality
function openPhotoModal() {
    const modal = document.getElementById('photo-modal');
    const modalImg = document.getElementById('modal-image');
    const eventPhoto = document.getElementById('event-photo');

    modal.style.display = 'flex';
    modalImg.src = eventPhoto.src;
}

function closePhotoModal() {
    const modal = document.getElementById('photo-modal');
    modal.style.display = 'none';
}

// Close modal when clicking outside the image
window.onclick = function (event) {
    const modal = document.getElementById('photo-modal');
    if (event.target == modal) {
        modal.style.display = 'none';
    }
}