/**
 * Created by richard on 18-1-2.
 */
exports.randomAvatar = () => {
    const random = (Math.random()*12).toFixed(0);
    const path = '/images/avatar/' + random + '.jpg';
    return path;
}