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


$(() => {
    const nameInput = $('#createEnv input[name="name"]');
    const descriptionInput = $('#createEnv input[name="description"]');
    const indexInput = $('#createEnv input[name="index"]');
    const saveButton = $('#createEnv .j-save');
    const errorBlock = $('#createEnv .error');

    $(nameInput).add(descriptionInput).add(indexInput)
        .keyup(disableSend)
        .change(disableSend);

    saveButton.click(() => {
        errorBlock.hide();

        fetch('/api/environment', {
            method: 'POST',
            mode: 'cors',
            cache: 'no-cache',
            credentials: 'same-origin',
            headers: { 'Content-Type': 'application/json' },
            redirect: 'follow',
            referrerPolicy: 'no-referrer',
            body: JSON.stringify(getData())
        })
        .then(() => {
            // TODO check not success result
            // Looks like fetch doesn't go to catch
            location.reload();
        })
        .catch(() => {
            errorBlock.show();
        })

        return false;
    });

    function disableSend() {
        const data = getData();

        const disabled = !data.name || !data.description || data.orderIndex < 1;

        saveButton.prop('disabled', disabled);
    }

    function getData() {
        const name = nameInput.val();
        const description = descriptionInput.val();
        const orderIndex = indexInput.val();

        return {
            name,
            description,
            orderIndex: Number(orderIndex)
        }
    }
});
