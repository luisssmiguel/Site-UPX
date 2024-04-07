document.addEventListener('DOMContentLoaded', function() {
    var calendarEl = document.getElementById('calendar');
    var calendar = new FullCalendar.Calendar(calendarEl, {
        plugins: [ 'dayGrid' ],
        header: {
            left: 'prev,next today',
            center: 'title',
            right: 'dayGridMonth,dayGridWeek,dayGridDay'
        },
        defaultDate: new Date(),
        editable: true,
        events: [
            {
                title: 'Coleta de Recicláveis',
                start: '2024-04-10'
            },
            {
                title: 'Coleta de Orgânicos',
                start: '2024-04-15'
            },
            {
                title: 'Coleta de Eletrônicos',
                start: '2024-04-22'
            }
        ]
    });
    calendar.render();
});
