module.exports = mongoose => {
    var schema = mongoose.Schema(
        {
            name: String,
            ca: String
        },
        { timestamps: true }
    );

    schema.method('toJSON', function() {
        const { __v, _id, ...object} = this.toObject();
        object.id = _id;
        console.log('object', object);
        return object;
    })

    const Cities = mongoose.model('cities', schema);

    // const Cities = mongoose.model("cities", mongoose.Schema({
    //     name: String,
    //     ca: String
    // }, {
    //     timestamps: true
    // }));

    return Cities;
}