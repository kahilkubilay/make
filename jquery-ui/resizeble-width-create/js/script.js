$(document).ready(function () {

    document.getElementById('create').onclick = function () {

        //get element val

        var values = [];

        var widthVal = $('#widthVal').val();
        var heightVal = $('#heightVal').val();
        var backgroundVal = $('#backgroundVal').val();
        var borderWeightVal = $('#borderWeightVal').val();
        var borderType = $('#borderType').val();
        var borderColorVal = $('#borderColorVal').val();

        values[0] = widthVal;
        values[1] = heightVal;
        values[2] = backgroundVal;
        values[3] = borderWeightVal;
        values[4] = borderType;
        values[5] = borderColorVal;

        $('#createCont').css({
            'width': widthVal,
            'height': heightVal,
            'backgroundColor': backgroundVal,
            'border': borderWeightVal + 'px ' + borderType + ' ' + ' ' + borderColorVal,
        });

        createValStyle(values);

    }

    function createValStyle(val) {

        $('#stylesheet').css({
            'display': 'block'
        });
        $('#copy').css({
            'display': 'block'
        });

        val[3] += ' ' + val[4];
        val[3] += ' ' + val[5];

        for (var i = 0; i < 4; i++) {
            $('#stylesheet span:eq(' + i + ')').text('');
            $('#stylesheet span:eq(' + i + ')').append(val[i] + ';');
        }
    }

    document.getElementById('copy').onclick = function () {

        var copyCode = $('#stylesheet').text();
        copyCode = copyCode.toLowerCase();
        copyCode = copyCode.replace(/\s+/g, '');

        var txtArea = document.createElement('TEXTAREA');
        txtArea.value = copyCode;
        document.body.appendChild(txtArea);
        txtArea.select();
        document.execCommand('copy');
        txtArea.style.display = 'none';

    }
});