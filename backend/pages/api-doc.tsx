import { GetStaticProps, InferGetStaticPropsType } from 'next';
import { createSwaggerSpec } from 'next-swagger-doc';
import dynamic from 'next/dynamic';
import 'swagger-ui-react/swagger-ui.css';

const SwaggerUI = dynamic<{
  spec: any;
}>(import('swagger-ui-react'), { ssr: false });

function ApiDoc({ spec }: InferGetStaticPropsType<typeof getStaticProps>) {
  return <SwaggerUI spec={spec} />;
}

export const getStaticProps: GetStaticProps = async () => {
  const spec: Record<string, any> = createSwaggerSpec({
    apiFolder: 'pages/api',
    definition: {
      openapi: '3.0.0',
      info: {
        title: 'Cayapa Solar API',
        version: '1.0.0',
        description: 'API para gestión de datos de energía solar con tecnología BSV Blockchain',
        contact: {
          name: 'Cayapa Solar',
          url: 'https://cayapa-solar.com',
        },
      },
      servers: [
        {
          url: 'http://localhost:3001',
          description: 'Servidor de desarrollo',
        },
      ],
      tags: [
        {
          name: 'Energy Data',
          description: 'Endpoints para gestión de datos de energía solar',
        },
        {
          name: 'Wallet',
          description: 'Endpoints para información de wallet BSV',
        },
        {
          name: 'Status',
          description: 'Endpoints de estado del sistema',
        },
      ],
    },
  });

  return {
    props: {
      spec,
    },
  };
};

export default ApiDoc;
