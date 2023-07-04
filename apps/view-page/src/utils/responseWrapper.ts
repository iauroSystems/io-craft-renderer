export default function onSuccess(result: any, message = 'success') {
  return {
    statusCode: 200,
    message,
    result,
  };
}
