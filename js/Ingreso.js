class Ingreso extends Dato{
    static contadorIngresos = 0;
    constructor(descripcion, valor) {
        propiedades = (
            super(descripcion, valor)
        )
    }
    static _id;

    get id(){
        //return _id.get(this).id;
        return this._id;
    }
}