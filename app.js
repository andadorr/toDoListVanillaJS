const tasks = [
  {
    _id: '5d2ca9e2e03d40b326596aa7',
    completed: true,
    body:
      'Occaecat non ea quis occaecat ad culpa amet deserunt incididunt elit fugiat pariatur. Exercitation commodo culpa in veniam proident laboris in. Excepteur cupidatat eiusmod dolor consectetur exercitation nulla aliqua veniam fugiat irure mollit. Eu dolor dolor excepteur pariatur aute do do ut pariatur consequat reprehenderit deserunt.\r\n',
    title: 'Eu ea incididunt sunt consectetur fugiat non.',
  },
  {
    _id: '5d2ca9e29c8a94095c1288e0',
    completed: false,
    body:
      'Aliquip cupidatat ex adipisicing veniam do tempor. Lorem nulla adipisicing et esse cupidatat qui deserunt in fugiat duis est qui. Est adipisicing ipsum qui cupidatat exercitation. Cupidatat aliqua deserunt id deserunt excepteur nostrud culpa eu voluptate excepteur. Cillum officia proident anim aliquip. Dolore veniam qui reprehenderit voluptate non id anim.\r\n',
    title:
      'Deserunt laborum id consectetur pariatur veniam occaecat occaecat tempor voluptate pariatur nulla reprehenderit ipsum.',
  },
  {
    _id: '5d2ca9e2e03d40b3232496aa7',
    completed: true,
    body:
      'Occaecat non ea quis occaecat ad culpa amet deserunt incididunt elit fugiat pariatur. Exercitation commodo culpa in veniam proident laboris in. Excepteur cupidatat eiusmod dolor consectetur exercitation nulla aliqua veniam fugiat irure mollit. Eu dolor dolor excepteur pariatur aute do do ut pariatur consequat reprehenderit deserunt.\r\n',
    title: 'Eu ea incididunt sunt consectetur fugiat non.',
  },
  {
    _id: '5d2ca9e29c8a94095564788e0',
    completed: false,
    body:
      'Aliquip cupidatat ex adipisicing veniam do tempor. Lorem nulla adipisicing et esse cupidatat qui deserunt in fugiat duis est qui. Est adipisicing ipsum qui cupidatat exercitation. Cupidatat aliqua deserunt id deserunt excepteur nostrud culpa eu voluptate excepteur. Cillum officia proident anim aliquip. Dolore veniam qui reprehenderit voluptate non id anim.\r\n',
    title:
      'Deserunt laborum id consectetur pariatur veniam occaecat occaecat tempor voluptate pariatur nulla reprehenderit ipsum.',
  },
];

(function(arrOfTasks) {

  const objOfTasks = arrOfTasks.reduce((acc, task) => {
    acc[task._id] = task;
    return acc;
  }, {})
  // Elements UI
  const listContainer = document.querySelector(
    '.tasks-list-section .list-group'
  );
  const form = document.forms['addTask'];

  // Events
  renderAllTasks(objOfTasks);
  form.addEventListener('submit', onFormSubmit);
  listContainer.addEventListener('click', onDeleteHendler)

  function renderAllTasks(data) {
    if (!data) {
      console.error('data was not defind');
      return;
    }

    const fragment = document.createDocumentFragment();
    Object.values(data).forEach(task => {
      const liEl = listItemTemplate(task);
      fragment.append(liEl);
    });
    listContainer.append(fragment);
  }

  function listItemTemplate({_id, title, body} = {}) {
    const li = document.createElement('li');
    li.classList.add(
      'list-group-item',
      'd-flex',
      'align-items-center',
      'flex-wrap',
      'mt-2');
    li.setAttribute('data-task-id', _id);
    const span = document.createElement('span');
    span.textContent = title;
    span.style.fontWeight = 'bold';

    const btn = document.createElement('button');
    btn.textContent = 'Delete task';
    btn.classList.add(
      'btn',
      'btn-danger', 
      'ml-auto', 
      'delete-btn');
    
    const article = document.createElement('p');
    article.textContent = body;
    article.classList.add('mt-2', 'w-100');

    li.append(span, btn, article);
    return li;
  }

  function onFormSubmit(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    console.log(formData.get('title'), formData.get('body'));

    if (!formData.get('title') || !formData.get('body')) {
      alert("Some fields are empty");
      return;
    }

    const newTask = createNewTask(formData.get('title'), formData.get('body'));
    objOfTasks[newTask._id] = newTask;
    const listItem = listItemTemplate(newTask);
    listContainer.prepend(listItem);
    e.target.reset();
    console.log(listItem);
  }

  function createNewTask(title, body) {
    const newTask = {
      title,
      body,
      completed: false,
      _id: `task-${Math.random()}`,
    }
    return { ...newTask };
  }

  function deleteTask(id) {
    const { title } = objOfTasks[id];
    const isConfirm = confirm(`Are you sure to want delete task: ${title}`);
    if (!isConfirm) return isConfirm;
    delete objOfTasks[id];
    return isConfirm;
  }

  function deleteTaskFromHtml(el, predicat) {
    if (!predicat) return;
    el.remove();
  }

  function onDeleteHendler({ target }) {
    if (target.classList.contains('delete-btn')) {
      const parent = target.closest('[data-task-id]');
      const id = parent.dataset.taskId;
      const confirmed = deleteTask(id);
      deleteTaskFromHtml(parent, confirmed);
    }
  }
})(tasks);
