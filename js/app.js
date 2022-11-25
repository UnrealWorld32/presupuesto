var ingresos = [
    {
        descripcion: "Salario",
        valor: 20000
    },
    {
        descripcion: "Venta de Auto",
        valor: 50000
    }
]

var egresos = [
    {
        descripcion: "Renta",
        valor: 4000
    },
    {
        descripcion: "Ropa",
        valor: 800
    }
]

var descripcion = $('#descripcion');
var valor = $('#valor');

var cargarApp = () => {
    cargarCabecero();
    cargarIngresos();
    cargarEgresos();
}

var cargarCabecero = () => {
    var presupuesto = totalIngresos(ingresos) - totalEgresos(egresos);
    var porcentajeEgreso = totalEgresos(egresos) / totalIngresos(ingresos);
    $('#presupuesto').text(formatoMoneda(presupuesto));
    $('#ingresos').text(formatoMoneda(totalIngresos(ingresos)));
    $('#egresos').text(formatoMoneda(totalEgresos(egresos)));
    $('#porcentaje').text(formatoPorcentaje(porcentajeEgreso));
}

var totalIngresos = (ingresados) => {
    var totalIngreso = 0;
    for (let ingresa of ingresados) {
        totalIngreso += parseInt(ingresa.valor);
    }
    return totalIngreso;
}

var totalEgresos = (egresados) => {
    var totalEgreso = 0;
    for (let egresa of egresados) {
        totalEgreso += egresa.valor;
    }
    return totalEgreso;
}

var formatoMoneda = (valor) => {
    return valor.toLocaleString('es-MX', { style: 'currency', currency: 'MXN', minimumFractionDigits: 2 });
}

var formatoPorcentaje = (valor) => {
    return valor.toLocaleString('es-MX', { style: 'percent', minimumFractionDigits: 2 });
}

var validarInput = () => {
    ($('#descripcion').val() && $('#valor').val()) ? agregar() : '';
}

var agregar = () => {
    var tipo = $("#tipo :selected").val();
    const nuevo = {
        descripcion: descripcion.val(),
        valor: parseInt(valor.val())
    };
    (tipo === 'Ingreso') ? ingresos.push(nuevo) : egresos.push(nuevo);
    cargarCabecero();
    cargarIngresos();
    cargarEgresos();
    limpiarInputs();
}

var limpiarInputs = () => {
    descripcion.val('');
    valor.val('');
}

var cargarIngresos = () => {
    $('#lista_ingresos').empty();
    ingresos.map((elemento, indice) => {
        const botonEliminar = tag({
            tag: 'ion-icon',
            attrs: {
                name: "close-circle-outline",
                role: "img",
                class: "md hydrated",
                arialabel: "close circle outline",
                onclick: `eliminarIngreso(${indice})`
            }
        })('')
        $('#lista_ingresos').append(escribirElemento([describir(elemento.descripcion), derechar([sumar(elemento.valor), cuadroEliminar(botonEliminar)])]));
    })
}

var cargarEgresos = () => {
    $('#lista_egresos').empty();
    egresos.map((elemento, indice) => {
        const botonEliminar = tag({
            tag: 'ion-icon',
            attrs: {
                name: "close-circle-outline",
                role: "img",
                class: "md hydrated",
                arialabel: "close circle outline",
                onclick: `eliminarEgreso(${indice})`
            }
        })('')
        $('#lista_egresos').append(escribirElemento([describir(elemento.descripcion), derechar([restar(elemento.valor), porcentar(elemento.valor), cuadroEliminar(botonEliminar)])]));
    })
}

//  Toma de riesgos
var atrsToCadena = (obj = {}) =>
    Object.keys(obj)
        .map(attr => `${attr}="${obj[attr]}"`)
        .join('');

const atrsTag = obj => (contenido = '') =>
    `<${obj.tag}${obj.attrs ? ' ' : ''}${atrsToCadena(obj.attrs)}>${contenido}</${obj.tag}>`;

const tag = t => typeof t === 'string' ? atrsTag({ tag: t }) : atrsTag(t);

var elementoTag = elementos => tag({ tag: 'div', attrs: { class: 'elemento limpiarEstilos' } })(elementos);
var escribirElemento = elementos => elementoTag(elementos);
var describir = elementos => tag({ tag: 'div', attrs: { class: 'elemento_descripcion' } })(elementos);
var derechar = elementos => tag({ tag: 'div', attrs: { class: 'derecha limpiarEstilos' } })(elementos);
var sumar = elementos => tag({ tag: 'div', attrs: { class: 'elemento_valor' } })('+' + formatoMoneda(elementos));
var restar = elementos => tag({ tag: 'div', attrs: { class: 'elemento_valor' } })('-' + formatoMoneda(elementos));
var porcentar = elementos => tag({ tag: 'div', attrs: {class: 'elemento_porcentaje'}})(formatoPorcentaje(elementos / totalIngresos(ingresos)));
var cuadroEliminar = elementos => tag({ tag: 'button', attrs: { class: 'elemento_eliminar_btn' } })(elementos);

var eliminarIngreso = (elemento) => {
    ingresos.splice(elemento, 1);
    cargarCabecero();
    cargarIngresos();
}

var eliminarEgreso = (elemento) => {
    egresos.splice(elemento, 1);
    cargarCabecero();
    cargarEgresos();
}