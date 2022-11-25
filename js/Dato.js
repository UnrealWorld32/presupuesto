class Dato {
    constructor(descripcion, valor) {
        const propiedades = {
            _descripcion: descripcion,
            _valor: valor
        }
    }

    get descripcion() {
        return _descripcion.get(this).propiedades['_descripcion'];
    }

    set descripcion(nuevaDescripcion) {
        return _descripcion.get(this).propiedades['_descripcion'] = nuevaDescripcion;
    }

    get valor() {
        return _valor.get(this).propiedades['_valor'];
    }

    set valor(nuevoValor) {
        return _valor.get(this).propiedades['_valor'] = nuevoValor;
    }
}