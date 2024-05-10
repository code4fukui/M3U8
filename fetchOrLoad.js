export const fetchBinOrLoad = async (fn, defaultdata = null) => {
  try {
    if (fn.startsWith("https://") || fn.startsWith("http://") || !globalThis.Deno) {
      return new Uint8Array(await (await fetch(fn)).arrayBuffer());
    } else {
      return await Deno.readFile(fn);
    }
  } catch (e) {
    if (defaultdata) return defaultdata;
    throw e;
  }
};

export const fetchTextOrLoad = async (fn, defaulttxt = null) => {
  try {
    const bin = await fetchBinOrLoad(fn);
    return new TextDecoder().decode(bin);
  } catch (e) {
    if (defaulttxt) return defaulttxt;
    throw e;
  }
};
