const p1 = () => {
  console.log(1);
  return Promise.resolve();
};

const p2 = () => {
  return new Promise<void>((resolve) => {
    setTimeout(() => {
      console.log(2);
      resolve();
    }, 2000);
  });
};

const p3 = () => {
  return new Promise<void>((resolve) => {
    setTimeout(() => {
      console.log(3);
      resolve();
    }, 3000);
  });
};

const promiseList = [p1, p2, p3];

function awaitedPromiseList(promiseList: Array<() => Promise<void>>): Promise<void> {
  return promiseList.reduce((total, item) => {
    return total.then(() => item());
  }, Promise.resolve());
}

awaitedPromiseList(promiseList).then(() => {
  console.log("所有promise执行完毕");
});
