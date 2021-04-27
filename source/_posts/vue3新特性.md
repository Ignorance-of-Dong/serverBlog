---
title: vue3 新特性
date: "4/26/2021 4:28:16 PM "
tag: ["vue", "vue3"]
meta:
  - name: description
    content: null
  - name: keywords
    content: null
---

# vue3 新特性

## `v-model`

### 不同版本使用方式

> vue2.0

在 2.0 中 v-model 指令必须使用为 value 的 prop，如果想使用别的 prop，就不得不使用 b-bind.sync

> vue2.2

在 2.2 中组件中出现了 model 的选项，允许组件自定义用于`v-model`的 prop 和事件中，【组件中只能允许一个 `v-model`出现】

> vue3.0

在 3.0 中可以在同一组件中使用多个`v-model`进行双向绑定，可以自定义`v-model`修饰符

### 2.x 语法

> 在 2.x 中`v-modle`是 value 和 input 事件的语法糖

```html
<ChildComponent v-model="pageTitle" />

||等同于

<ChildComponent :value="pageTitle" @input="pageTitle = $event" />
```

> 如果要将属性或者事件名称修改为自定义名称，则需要在组件中添加`modle`选项

```html
<ChildComponent v-model="pageTitle" />; // ChildComponent.vue

<template>
  <div class="hello">
    <div @click="handleChange">{{msg}}</div>
  </div>
</template>
<script>
  export default {
    model: {
      prop: "msg", // 自定义变量名
      event: "change" // 自定义事件名
    },
    props: {
      value: String,
      msg: {
        type: String,
        default: "Default title"
      }
    },
    methods: {
      handleChange() {
        this.$emit("change", "12");
      }
    }
  };
</script>
```

> 使用`v-bind.sync` ---- 大体代码同上

```html
<ChildComponent :title.sync="pageTitle" />

// 使用 update:myPropName 抛出事件 this.$emit('update:title', newValue)
```

### 3.x 语法

在 3.x 中，自定义组件上的 v—modle 相当于传递了`modelVaule`prop 并收了`update:modelValue`事件

```html
<ChildComponent v-model:title="pageTitle" />

<!-- 是以下的简写: -->

<ChildComponent :title="pageTitle" @update:title="pageTitle = $event" />
```

---

```html
<template>
  <div>
    <input type="text" @input="first" :value="title" />
  </div>
</template>
<script>
  export default {
    name: "ChildComponent",
    props: {
      title: {
        default: () => "????"
      }
    },
    methods: {
      first(e) {
        this.$emit("update:title", e.target.value);
      }
    }
  };
</script>
```

也可以支持多个`v-model`

```html
<ChildComponent v-model:title="title" v-model:name="name" />

<template>
  <div>
    <input type="text" @input="first :value="title">
    <input type="text" @input="last" :value="name" />
  </div>
</template>
<script>
  export default {
    name: "ChildComponent",
    props: {
      title: {
        default: () => "????"
      },
      name: {
        defaule: () => "???"
      }
    },
    methods: {
      first(e) {
        this.$emit("update:title", e.target.value);
      },
      last() {
        this.$emit("update:name", e.target.value);
      }
    }
  };
</script>
```

## 自定义指令

### 2.x 用法

- bind - 指令绑定到元素后发生【只发生一次】
- inserted - 元素插入父 DOM 后发生
- update - 当元素更新，但子元素尚未更新时，调用此函数
- componentUpdated - 所造组件以及其子元素更新后，就会调用此函数
- unbind - 指令被移除，调用此函数

```html
<p v-highlight="'yellow'">高亮显示此文本亮黄色</p>

<script>
  // 注册一个全局自定义指令
  Vue.directive("highlight", {
    bind(el, binding, vnode) {
      el.style.background = binding.value;
    },
    inserted() {},
    update() {},
    componentupdated() {},
    unbind() {}
  });
  // 注册一个局部的指令【组件内部】
  directives: {
    highlight: {
      bind: () => {},
    }
  }
</script>
```

### 3.x

- beforeMount - 当指令第一次绑定到元素并且在挂载到父组件之前调用`【替换bind】`
- mounted - 在挂载绑定元素的父组件时调用 `【替换 inserted】`
- beforeUpdata - 在更新包含组件的子元素之前调用 `【新增】`
- updated - 更新之后调用 `【替换update】`
- beforeUnmount - 在卸载绑定之前调用 `【新增】`
- unmounted - 与元素解除绑定且父组件卸载时调用 `【替换unbind】`

```html
<p v-highlight="'yellow'">高亮显示此文本亮黄色</p>

<script>
  const app = Vue.createApp({});
  app.directive("highlight", {
    beforeMount(el, binding, vnode) {
      el.style.background = binding.value;
    }
  });
</script>
```

## 过滤器

### 2.x

```html
<template>
  <h1>Bank Account Balance</h1>
  <p>{{ accountBalance | currencyUSD }}</p>
</template>

<script>
  export default {
    props: {
      accountBalance: {
        type: Number,
        required: true
      }
    },
    filters: {
      currencyUSD(value) {
        return "$" + value;
      }
    }
  };
</script>
```

### 3.x

> 3.x 中，过滤器已被移除，不在支持，官方建议使用计算属性替换

## 是否支持多根节点

## 2.x

> 不支持多根节点

```html
<template>
  <div>
    <header>...</header>
    <main>...</main>
    <footer>...</footer>
  </div>
</template>
```

### 3.x

> 支持多根节点。必要明确定义属性的分布

```html
<template>
  <header>...</header>
  <main v-bind="$attrs">...</main>
  <footer>...</footer>
</template>
```

## `v-if` 与 `v-for` 的优先级

### 2.x

> 在一个元素上同时使用这两个指令，`v-for`优先级最高

### 3.x

> 在一个元素上同时使用这两个指令，`v-if`优先级最高

## watch

### 2.x

```js
watch:{
    person: {
      handler(newVal,oldVal) {
      // ...
      },
      deep: true,
      immediate: true
    }
}
```

### 3.x

```html
<template>
  <div>
    <button @click="count++">count is: {{ count }}</button>
  </div>
</template>

<script>
  import { watch, ref } from "vue";
  export default {
    setup() {
      let count = ref(0);
      let isShow = ref(true);
      watch(
        [count, isShow],
        ([newCount, newIsShow], [oldCount, oldIsShow]) => {
          console.log(newCount, newIsShow);
          console.log(oldCount, oldIsShow);
        },
        {
          deep: true
        }
      );
      return {
        count,
        isShow
      };
    }
  };
</script>
```

> 参数说明 `watch(source, callback, [options])`

- source - 指定监听的响应式变量 【支持`string, object, array, function`】
- callback - 执行的回调函数
- options - 支持 deep、immediate 和 flush 选项

#### 3.x 新增`watchEffect`

`watchEffect`回传入一个函数，然后立即执行这个函数，并在更改依赖时重新运行他

```html
<template>
  <div>
    <button @click="count++">count is: {{ count }}</button>
  </div>
</template>

<script>
  import { watchEffect, ref } from "vue";
  export default {
    setup() {
      let count = ref(0);
      watchEffect(() => {
        console.log(count.value);
      });
      return {
        count
      };
    }
  };
</script>
```

> **停止执行**

- 2.x 中`$watch`会在调用的时候返回一个函数，执行这个函数可以停止 `watch`

```js
const unwatch = this.$watch("count", () => {});
// 两秒后停止监听
setTimeout(() => {
  unwatch();
}, 2000);
```

- 在 3.x 中`watch`和`watchEffect`同样也会返回一个 unwatch 函数，用于取消执行

```js
export default {
  setup() {
    const count = ref(0);
    const unwatch = watchEffect(() => {
      // 仅仅输出0
      console.log(count.value);
    });

    setTimeout(() => {
      count.value = 2;
    }, 2000);
    // 1秒后取消watch，所以上面的代码只会输出0
    setTimeout(() => {
      unwatch();
    }, 1000);
  }
};
```

## v-for

### 2.x

在 2.x 中`<template>`标记中不能包含 key，只能将`key`放到子元素中

```html
<template v-for="item in list">
  <div :key="item.id">...</div>
  <span :key="item.id">...</span>
</template>
```

### 3.x

在 3.x 中，`key` 值应该放置到`<template>`标签上

```html
<template v-for="item in list" :key="item.id">
  <div>...</div>
  <span>...</span>
</template>
```

## 数据建立 data

### 2.x

```js
export default {
  props: {
    strProp: String
  },
  data() {
    return {
      value1: "",
      value2: ""
    };
  }
};
```

### 3.x

```js
import { reactive } from "vue";

export default {
  props: {
    strProp: String
  },
  setup(props, { emit, attrs, slot }) {
    const state = reactive({
      value1: "",
      value2: ""
    });

    return { state };
  }
};
```

> setup(props, context)

- props - 组件传入到属性
- context - 包含三个属性【`{emit, attrs. slot}`】

> `setup`中接受的 props 是响应式的，当传入新的 props 时，会被及时更新，由于是响应式的，所以不可以使用 ES6 解构，解决办法就是使用 toRefs。

- `toRef` 就是把不是响应式的对象转化为响应式

- `toRefs` 用于将一个`reactive`对象转化为属性全部为`ref`对象的普通对象

- `Ref` 接受一个内部值并返回一个响应式且可变的`ref`对象, `ref`对象具有片指向内部值的单个 `property.value`

- `reactive` 返回对象的响应式副本

```js
setup() {
  const obj = ref({count:1, name:"张三"});//ref处理对象
  setTimeout(() =>{
      obj.value.count = obj.value.count + 1;
      obj.value.name = "李四";
  }, 1000)
  return{obj}
}

setup() {
  const year = ref(0);//ref处理基础类型
  const user = reactive({ nickname: "xiaofan", age: 26, gender: "女" });//reactive处理对象
  return {year,user};
}

// 使用toRefs
setup() {
  const year = ref(0);
  const user = reactive({ nickname: "xiaofan", age: 26, gender: "女" });
  return {year,...toRefs(user)};//使用toRefs处理reactive对象为 ref 对象
}

```

## 生命周期

### 2.x

- `beforeCreate`
- `created`
- `beforeMount`
- `mounted`
- `beforeUpdate`
- `updated`
- `beforeUnmount`
- `unmounted`
- `errorCaptured`
- `renderTracked`
- `renderTriggered`

## 3.x

在`setup()`内部调用生命周期钩子函数

> 因为`setup`是围绕`beforeCreate`和 `Created`生命周期钩子运行的，所以不需要显示的定义他们

- `onBeforeMount` - 【替换 `beforeMount`】
- `onMounted` - 【替换 `mounted`】
- `onBeforeUpdate` - 【替换 `beforeUpdate`】
- `onUpdated` - 【替换 `updated`】
- `onBeforeUnmount` - 【替换 `beforeUnmount`】
- `onUnmounted` - 【替换 `unmounted`】
- `onErrorCaptured` - 【替换 `errorCaptured`】
- `onRenderTracked` - 【替换 `renderTracked`】
- `onRenderTriggered` - 【替换 `renderTriggered`】

```js
setup() {
  onMounted(() => {
    console.log('mounted!')
  })
  onUpdated(() => {
    console.log('updated!')
  })
  onUnmounted(() => {
    console.log('unmounted!')
  })
}

```
