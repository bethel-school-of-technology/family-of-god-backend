// module.exports = function(models) {
//     models.users.hasMany(models.posts, {
//         foreignKey: 'UserId'
//     });
//     models.posts.belongsTo(models.users, {
//         foreignKey: 'UserId'
//     });
//     models.comments.belongsTo(models.posts, {
//         foreignKey: 'PostId'
//     });
//     models.posts.hasMany(models.comments, {
//         foreignKey: 'PostId'
//     });
//     models.users.hasMany(models.comments, {
//         foreignKey: 'UserId'
//     });
//     models.comments.belongsTo(models.users, {
//         foreignKey: 'UserId'
//     });

// }

module.exports = function(models) {
    models.users.hasMany(models.prayerrequest, {
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