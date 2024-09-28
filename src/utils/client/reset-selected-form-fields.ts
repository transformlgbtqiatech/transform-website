export function resetAllExcept(form: string | HTMLFormElement, exceptFieldIds: string[]): void {
  let formElement: HTMLFormElement;

  if (typeof form === 'string') {
    const foundForm = document.getElementById(form) as HTMLFormElement | null;
    if (!foundForm) {
      console.error(`Form with id "${form}" not found`);
      return;
    }
    formElement = foundForm;
  } else if (form instanceof HTMLFormElement) {
    formElement = form;
  } else {
    console.error('Invalid form parameter. Expected string or HTMLFormElement.');
    return;
  }

  // Function to reset an element if it's not in the excepted list
  const resetIfNotExcepted = (element: HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement) => {
    if (!exceptFieldIds.includes(element.id)) {
      if (element instanceof HTMLSelectElement) {
        element.selectedIndex = 0;
      } else {
        element.value = '';
      }
    }
  };

  // Reset input elements
  Array.from(formElement.getElementsByTagName('input')).forEach(resetIfNotExcepted);

  // Reset select elements
  Array.from(formElement.getElementsByTagName('select')).forEach(resetIfNotExcepted);

  // Reset textarea elements
  Array.from(formElement.getElementsByTagName('textarea')).forEach(resetIfNotExcepted);
}