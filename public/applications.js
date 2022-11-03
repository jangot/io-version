$(() => {
    $('#createApp input').keyup((event) => {
        const val = $(event.target).val();
        $('#createApp button').prop('disabled', !val);
    });
    $('#createApp input').change((event) => {
        const val = $(event.target).val();
        $('#createApp button').prop('disabled', !val);
    });
    $('#createApp button').click(() => {
        $('#createApp error').hide();
        const name = $('#createApp input').val();
        if (!name) return;

        const response = fetch('/api/application', {
            method: 'POST',
            mode: 'cors',
            cache: 'no-cache',
            credentials: 'same-origin',
            headers: { 'Content-Type': 'application/json' },
            redirect: 'follow',
            referrerPolicy: 'no-referrer',
            body: JSON.stringify({
                name,
                isActive: true
            })
        })
        .then(() => {
            location.reload();
        })
        .catch(() => {
            $('#createApp error').show();
        })

        return false;
    });
});