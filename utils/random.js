/**
 * Created by richard on 18-1-2.
 */
exports.randomAvatar = () => {
    let random = (Math.random()*12).toFixed(0);
    let path = '/images/avatar/' + random + '.jpg';
    return path;
}