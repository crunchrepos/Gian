import {json} from '@remix-run/server-runtime';
import {AppSession} from '../lib/session';

export let action = async ({request, context}) => {
  const {session} = context
  const { userEmail } = await request.json();
  session.set('crunch-userEmail', userEmail);

  // Verifique se o valor foi definido corretamente

  // // Salve as alterações na sessão
  await session.commit();
  const storedEmail = session.get('crunch-userEmail');


  return json({email: userEmail}, {status: 200});
};

