//存储,可设置过期时间
export function set(key, value, expires) {
  // console.log(key);
  const params = { key, value, expires };
  if (expires) {
    // 记录何时将值存入缓存，毫秒级
    const data = Object.assign(params, { startTime: new Date().getTime() });
    localStorage.setItem(key, JSON.stringify(data));
  } else {
    if (Object.prototype.toString.call(value) == '[object Object]') {
      value = JSON.stringify(value);
    }
    if (Object.prototype.toString.call(value) == '[object Array]') {
      value = JSON.stringify(value);
    }
    localStorage.setItem(key, value);
  }
};

 //取出
export function get1(key) {
  let item = localStorage.getItem(key);
  // 先将拿到的试着进行json转为对象的形式
  try {
    item = JSON.parse(item);
  } catch (error) {
    // eslint-disable-next-line no-self-assign
    item = item;
  }
  // 如果有startTime的值，说明设置了失效时间
  if (item && item.startTime) {
    let date = new Date().getTime();       // 如果大于就是过期了，如果小于或等于就还没过期
    if (date - item.startTime > item.expires) {
      localStorage.removeItem(key);
      return false;
    } else {
      return item.value;
    }
} else {
    return item;
  }
}

 //导出

//    49 存：request.set('uid',option.uid,43200000);//时间单位毫秒级
//    50       request.set('token',option.token,43200000); 
//    51 取：let uid = request.localget('uid');
//    52       let token = request.localget('token');  