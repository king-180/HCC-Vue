/**
 * Created by Administrator on 2017/5/23.
 */
// 转换mysql的datetime日期时间格式
function makeSex(sex) {

  return sex == '1' ? '男' : sex == '0' ? '女' : '性别未知';

}

export {

  makeSex,

}
