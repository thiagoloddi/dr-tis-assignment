export const handle = (controller) => {
  return  async (req, res) => {
    const { method, params, body } = req;
    let response;

    switch(method) {
      case "GET": 
      case "DELETE":
        response = await controller.call(null, params);
        break;

      case "POST":
        response = await controller.call(null, body);
        break;

      case "PUT":
      default:
        response = await controller.call(null, params, body);
        break;
    }

    const { status, data } = response;

    if(status != 200) {
      console.error(data);
    }

    res.status(status).send(data);
  }
}