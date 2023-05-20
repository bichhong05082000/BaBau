const errorHandle = require('../middlewares/error.handle');
const ErrorResponse = require('../helpers/ErrorResponse');
const accountRouter = require('./account.router');
const foodCateRouter = require('./food.cate.router');
const foodCateRootRouter = require('./food.cate.root.router');
const foodRouter = require('./food.router');
const storyRouter = require('./story.router');
const imgPrettyChildRouter = require('./image.pretty.child.router');
const musicRouter = require('./music.router');
const postRouter = require('./post.week.router');
const appoimentRouter = require('./appoiment.router');
const babyDiaryRouter = require('./baby.diary.router');
const childChartRouter = require('./child.chart.router');
const momChartRouter = require('./mom.chart.router');
const videoRouter = require('./video.children.router');
const saveFoodRouter = require('./save.food.router');
const fetalMoveRouter = require('./fetal.movements.router');
const fetalDevWeeklyRouter = require('./fetal.development.weekly.router');

module.exports = (app) => {
  app.use('/api/accounts', accountRouter);
  app.use('/api/food-categories', foodCateRouter);
  app.use('/api/food-categories-root', foodCateRootRouter);
  app.use('/api/foods', foodRouter);
  app.use('/api/stories', storyRouter);
  app.use('/api/image-children', imgPrettyChildRouter);
  app.use('/api/music', musicRouter);
  app.use('/api/posts', postRouter);
  app.use('/api/appoiments', appoimentRouter);
  app.use('/api/baby-diaries', babyDiaryRouter);
  app.use('/api/child-chart', childChartRouter);
  app.use('/api/mom-chart', momChartRouter);
  app.use('/api/videos', videoRouter);
  app.use('/api/save-food', saveFoodRouter);
  app.use('/api/fetal-movements', fetalMoveRouter);
  app.use('/api/fetal-development-weekly', fetalDevWeeklyRouter);

  app.use('*', (req, res, next) => {
    throw new ErrorResponse(404, 'Page not found');
  });
  app.use(errorHandle);
};
