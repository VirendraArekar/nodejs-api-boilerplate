// @ts-ignore
import express from 'express';
// @ts-ignore
import swaggerJsdoc from 'swagger-jsdoc';
// @ts-ignore
import swaggerUi from 'swagger-ui-express';
import swaggerDefinition from '../../docs/swaggerDef';

const router = express.Router();

const specs = swaggerJsdoc({
  swaggerDefinition,
  apis: ['src/docs/*.yml', 'src/routes/v1/*.ts']
});

router.use('/', swaggerUi.serve);
router.get(
  '/',
  swaggerUi.setup(specs, {
    explorer: true
  })
);

export default router;