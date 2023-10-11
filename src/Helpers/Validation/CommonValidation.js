//Handle validation Change
export const handleValidationChange = (name, value, set) => {
    set(prevState => ({
        ...prevState,
        [name]: value
    }));
}

export const handleExpressPackageValidationChange = (
  name,
  value,
  set,
  packageError
) => {
  var index = name.split("@")[0];

  var arr = [...packageError];

  arr[parseInt(index)][name.split("@")[1]] = value;

  set(arr);
};
