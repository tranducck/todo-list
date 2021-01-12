const tasks = [
  { id: 1, name: 'Buy medicines', status: 'TODO' },
  { id: 2, name: 'Go to dentist', status: 'TODO' },
  { id: 3, name: 'Do Shopping', status: 'TODO' },
  { id: 4, name: 'Call to the car service', status: 'TODO' },
  { id: 5, name: 'Complete work report', status: 'IN_PROGRESS' },
  { id: 6, name: 'Grandpa birthday', status: 'IN_PROGRESS' },
  { id: 7, name: 'Block the table', status: 'DONE' },
  { id: 8, name: 'Buy new suitcase', status: 'DONE' },
]

export default {
  name: 'news-page',
  data() {
    return {
      tasks,
      draggingTask: null,
    }
  },
  mounted() {},
  methods: {
    onDragItemStart(task) {
      this.draggingTask = task
    },

    onDragItemEnter(task) {
      if (!this.draggingTask) return
      if (this.draggingTask.id === task.id) return
      if (this.draggingTask.status !== task.status) return

      const fromindex = this.tasks.findIndex(
        (task) => task.id === this.draggingTask.id
      )
      const toindex = this.tasks.findIndex((t) => t.id === task.id)

      if (fromindex < toindex) {
        for (let i = fromindex; i < toindex; i++) {
          this.tasks[i] = this.tasks[i + 1]
        }
        this.tasks[toindex] = this.draggingTask
      }
      if (fromindex > toindex) {
        for (let i = fromindex; i > toindex; i--) {
          this.tasks[i] = this.tasks[i - 1]
        }
        this.tasks[toindex] = this.draggingTask
      }
      this.$forceUpdate()
    },

    onDragItemEnd(e) {
      this.draggingTask = null
    },

    onDragStateEnter(status) {
      if (!this.draggingTask) return

      let tasks = clone(this.tasks)
      tasks = tasks.filter((t) => t.id !== this.draggingTask.id)
      this.draggingTask = { ...this.draggingTask, status }
      tasks.push(this.draggingTask)
      this.tasks = tasks
    },

    onDragStateEnd(status) {
      this.draggingTask = null
    },

    renderTodoList() {
      const tasks = this.tasks.filter((task) => task.status === 'TODO')
      let $dropZone = (
        <div key="todo_zone" class="todo__item empty">
          &nbsp;
        </div>
      )
      if (this.draggingTask && this.draggingTask.status === 'IN_PROGRESS') {
        $dropZone = (
          <div
            class="todo__item dropzone"
            key="todo_zone"
            vOn:dragenter={() => this.onDragStateEnter('TODO')}
            vOn:dragend={() => this.onDragStateEnd('TODO')}
          >
            Back to Todo list
          </div>
        )
      }

      return (
        <div class="card todo__card">
          <div class="card-content">
            <h3 class="mb-5 title has-text-primary">To do</h3>
            <div class="todo__list">
              {tasks.map((task) => {
                let cls = 'todo__item'
                if (this.draggingTask && this.draggingTask.id === task.id)
                  cls += ' ghost'

                return (
                  <div
                    draggable
                    vOn:dragstart={() => this.onDragItemStart(task)}
                    vOn:dragenter={() => this.onDragItemEnter(task)}
                    vOn:dragend={() => this.onDragItemEnd(task)}
                    class={cls}
                    key={task.id}
                  >
                    {task.name}
                  </div>
                )
              })}
              {$dropZone}
            </div>
          </div>
        </div>
      )
    },

    renderInProgressList() {
      const tasks = this.tasks.filter((task) => task.status === 'IN_PROGRESS')
      let $dropZone = (
        <div key="in_progress_zone" class="todo__item empty">
          &nbsp;
        </div>
      )
      if (this.draggingTask && this.draggingTask.status === 'TODO') {
        $dropZone = (
          <div
            class="todo__item dropzone"
            key="in_progress_zone"
            vOn:dragenter={() => this.onDragStateEnter('IN_PROGRESS')}
            vOn:dragend={() => this.onDragStateEnd('IN_PROGRESS')}
          >
            To progress
          </div>
        )
      }
      if (this.draggingTask && this.draggingTask.status === 'DONE') {
        $dropZone = (
          <div
            class="todo__item dropzone"
            key="in_progress"
            vOn:dragenter={() => this.onDragStateEnter('IN_PROGRESS')}
            vOn:dragend={() => this.onDragStateEnd('IN_PROGRESS')}
          >
            Back to progress
          </div>
        )
      }

      return (
        <div class="card todo__card">
          <div class="card-content">
            <h3 class="mb-5 title has-text-primary">In progress</h3>
            <div class="todo__list">
              {tasks.map((task) => {
                let cls = 'todo__item'
                if (this.draggingTask && this.draggingTask.id === task.id)
                  cls += ' ghost'

                return (
                  <div
                    draggable
                    vOn:dragstart={() => this.onDragItemStart(task)}
                    vOn:dragenter={() => this.onDragItemEnter(task)}
                    vOn:dragend={() => this.onDragItemEnd(task)}
                    class={cls}
                    key={task.id}
                  >
                    {task.name}
                  </div>
                )
              })}
              {$dropZone}
            </div>
          </div>
        </div>
      )
    },

    renderDoneList() {
      const tasks = this.tasks.filter((task) => task.status === 'DONE')
      let $dropZone = (
        <div key="done_zone" class="todo__item empty">
          &nbsp;
        </div>
      )
      if (this.draggingTask && this.draggingTask.status === 'IN_PROGRESS') {
        $dropZone = (
          <div
            class="todo__item dropzone"
            key="done_zone"
            vOn:dragenter={() => this.onDragStateEnter('DONE')}
            vOn:dragend={() => this.onDragStateEnd('DONE')}
          >
            To Done
          </div>
        )
      }

      return (
        <div class="card todo__card">
          <div class="card-content">
            <h3 class="mb-5 title has-text-primary">Done</h3>
            <div class="todo__list">
              {tasks.map((task) => {
                let cls = 'todo__item'
                if (this.draggingTask && this.draggingTask.id === task.id)
                  cls += ' ghost'

                return (
                  <div
                    draggable
                    vOn:dragstart={() => this.onDragItemStart(task)}
                    vOn:dragenter={() => this.onDragItemEnter(task)}
                    vOn:dragend={() => this.onDragItemEnd(task)}
                    class={cls}
                    key={task.id}
                  >
                    {task.name}
                  </div>
                )
              })}
              {$dropZone}
            </div>
          </div>
        </div>
      )
    },

    shuffle() {
      let tasks = JSON.parse(JSON.stringify(this.tasks))
      tasks = shuffle(tasks)
      this.tasks = tasks
    },
  },

  render(h) {
    return (
      <div class="page">
        <div class="has-background-primary" style="height: 20vh" />
        <div class="is-flex-grow-1">
          <div
            class="container is-flex is-justify-content-space-between"
            style="margin-top: -60px"
          >
            {this.renderTodoList()}
            {this.renderInProgressList()}
            {this.renderDoneList()}
          </div>
        </div>
      </div>
    )
  },
}

function shuffle(a) {
  let j, x, i
  for (i = a.length - 1; i > 0; i--) {
    j = Math.floor(Math.random() * (i + 1))
    x = a[i]
    a[i] = a[j]
    a[j] = x
  }
  return a
}

function clone(obj) {
  return JSON.parse(JSON.stringify(obj))
}
