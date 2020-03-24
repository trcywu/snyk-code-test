import fetch from "node-fetch";

export const getPackage = async (req: any, res: any) => {
  const name = req.params.name;
  try {
    const data = await fetch(
      `https://registry.npmjs.org/${name}/latest`
    ).then(res => res.json());
    if (data === "Not Found") {
      res.status(404).send({ type: "error", message: "Package not found" });
    }
    res.send(data);
  } catch (error) {
    res.status(500).send();
  }
};
