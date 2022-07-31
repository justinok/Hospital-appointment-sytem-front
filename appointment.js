var app = {
    backend: 'http://localhost:8080/appointment',
    table : null,
    init: function() {
        app.initDatatable('#personas');

        $("#save").click(function(){
            app.save({
                id: $('#id').val(),
                patient_id : $('#Nombre paciente').val(),
                date: $('#fecha').val(),
                speciality_id: $('#speciality_id').val(),
                physician_id: $('#physician_id').val()
            });
        });
    },
    initDatatable : function(id) {
        app.table = $(id).DataTable({
            ajax : {
                url : app.backend + '/all',
                dataSrc : function(json) {
                    return json;
                }
            },
            dom: 'Bfrtip',
            columns : [
                {data : "id"},
                {data : "Nombre paciente"},
                {data : "date"},
                {data : "speciality_id"},
                {data : "physician_id"}
            ],
            buttons: [
                {
                    text : 'Editar',
                    action : function(e, dt, node, config) {
                        var data = dt.rows('.table-active').data()[0];
                        app.setDataToModal(data);
                        $('#personaModal').modal();
                    }
                }
            ]
        });

        $('#personas tbody').on('click', 'tr', function(){
            if ($(this).hasClass('table-active')) {
                $(this).removeClass('table-active');
            } else {
                app.table.$('tr.table-active').removeClass('table-active');
                $(this).addClass('table-active');
            }
        });
    },
    setDataToModal : function(data) {
        $('#id').val(data.id);
        $('#patient_id').val(data.patient_id);
        $('#date').val(data.date);
        $('#speciality_id').val(data.speciality_id);
        $('#physician_id').val(data.physician_id);
    },
    save : function(data) {
        $.ajax({
            url: app.backend + '/save',
            data : JSON.stringify(data),
            method: 'POST',
            dataType : 'json',
            contentType: "application/json; charset=utf-8",
            success : function(json) {
                $("#msg").text('Se guardó la persona correctamente');
                $("#msg").show();
                $('#personaModal').modal('hide');
                app.table.ajax.reload();
            },
            error : function(error) {

            }
        })
    }
};

$(document).ready(function(){
    app.init();
});