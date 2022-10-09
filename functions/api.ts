export const onRequestGet: PagesFunction = async (context) => {
  return new Response(JSON.stringify(context, undefined, 4));
};
