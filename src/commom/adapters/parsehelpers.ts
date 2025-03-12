export const isButtonFormat = (str: unknown): str is string => {
    return typeof str === 'string' && str.startsWith('Buttons:');
  };
  
  export const extractButtons = (str: string) => {
    const strMsg = str.replace('Buttons:', '').trim();
    return strMsg
      .split('|')
      .slice(0, 3)
      .map((v) => {
        const arr = /([^[]+)(\[.+\])?/.exec(v)?.slice(1);
        // tslint:disable-next-line: strict-type-predicates
        if (arr?.every((val) => val)) {
          const [title, value] = arr;
          const output = { title, value };
          output.title = title.trim();
          output.value = output.value.replace(/(\[)?(\])?/g, '').trim();
          return output;
        } else {
          v.trim();
          return v;
        }
      });
  };
  
  export const isListFormat = (str: unknown): str is string => {
    return typeof str === 'string' && /List(\([\d]+\))?:/.test(str);
  };
  
  export const extractList = (str: string) => {
    const strMsg = str.replace(/List(\([\d]+\))?:/, '').trim();
    return strMsg.split('\n').map((v, idx) => {
      if (idx > 0 && v.startsWith('-')) {
        v = v.replace('-', '');
      }
      const arr = /([^[]+)(\[.+\])?/.exec(v)?.slice(1);
      if (arr?.every((val) => val)) {
        const [title, value] = arr;
        const output = { title, value };
        output.title = title.trim();
        output.value = output.value.replace(/(\[)?(\])?/g, '').trim();
        return output;
      } else {
        v.trim();
        return v;
      }
    });
  };