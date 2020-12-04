module.exports = function(models) {
    models.users.hasMany(models.posts, {
        foreignKey: 'UserId'
    });
    models.prayerrequest.belongsTo(models.users, {
        foreignKey: 'UserId'
    });
    models.comments.belongsTo(models.prayerrequest, {
        foreignKey: 'PrayerRequestId'
    });
    models.prayerrequest.hasMany(models.comments, {
        foreignKey: 'PrayerRequestId'
    });
    models.users.hasMany(models.comments, {
        foreignKey: 'UserId'
    });
    models.comments.belongsTo(models.users, {
        foreignKey: 'UserId'
    });

}