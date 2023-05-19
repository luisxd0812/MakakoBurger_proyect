$(document).ready(function(){
    $('#tabla-reporte').DataTable({
        language: {
            "zeroRecords": "No se encontraron resultados",
        },
        responsive:"true",
        dom:"B",
        buttons:[
            {
                extend: 'spacer',
                style: 'bar',
                text: 'exportar archivos'
            },
            {
                extend: 'excelHtml5',
                text: '<span><i class="fa-solid fa-file-excel"></i> Excel</span>',
                tittleAttr: 'Exportar a Excel',
                className: 'btn '
            },
            'spacer',
            {
                extend: 'print',
                text: '<span><i class="fa-solid fa-print"></i> Imprimir</span>',
                tittleAttr: 'Imprimir',
                className: 'btn btn-secondary '
            },
            'spacer',
        ]
    });
});