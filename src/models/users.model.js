const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    profilePic: {
        type: String,
    },
    email: {
        type: String,
        required: true,
        match: /[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/, // Validación de formato de correo
        unique: true, // Aseguramos que el correo sea único
        lowercase: true, // Convertimos a minúsculas para evitar duplicados
        trim: true, // Eliminamos espacios en blanco
    },
    password: {
        type: String,
        required: true,
    }
}, {
    timestamps: true, // Agrega createdAt y updatedAt automáticamente
});

// Middleware para actualizar updated_at antes de cada actualización
userSchema.pre('save', function(next) {
    if (this.isModified('password')) {
        // Aquí puedes agregar lógica para hashear la contraseña si es necesario
    }
    next();
});

const User = mongoose.model('User', userSchema);

module.exports = User;



