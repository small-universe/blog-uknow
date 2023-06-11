---
title: Lombok使用
permalink: /post/undefined.html
date: 2022-12-24 20:27:49
meta:
  - name: keywords
    content: ''
  - name: description
tags: []
categories: []
author:
  name: terwer
  link: https://github.com/terwer
---

# Lombok使用



‍

## 简介

​`Lombok`​ 是一个非常热门的开源项目 ([github.com/rzwitserloo…](https://github.com/rzwitserloot/lombok))，使用它可以有效的解决 `Java`​ ​工程中那些繁琐又重复代码，例如 `Setter、Getter、toString、equals、hashCode`​​ 以及非空判断等，都可以使用 `Lombok`​ ​有效的解决。

‍

使用`Lombok`​的优缺点：

优点：

1. 可以节省很多冗余代码，让代码看起来更加简洁
2. 解放程序员双手，比如在新增字段时，无需手动去加`get`​、`set`​，重写`toString`​、`equals`​等

缺点：

1. 降低了可调试性  
    Lombok 会帮我们自动生成很多代码，但这些代码是在编译期生成的，因此在开发和调试阶段这些代码可能是“丢失的”，这就给调试代码带来了很大的不便。但现在的编译器已经可以帮助我们弥补了这个缺陷
2. 可能会坑到队友

    尤其对于组人来的新人可能影响更大，假如这个之前没用过 Lombok，当他把代码拉下来之后，因为没有安装 Lombok 的插件，在编译项目时，就会提示找不到方法等错误信息，导致项目编译失败，进而影响了团结成员之间的协作
3. 可能会有兼容性问题  
    ​`Lombok`​ 对于代码有很强的侵入性，加上现在 `JDK`​ 版本升级比较快，每半年发布一个版本，而 `Lombok`​ 又属于第三方项目，并且由开源团队维护，因此就没有办法保证版本的兼容性和迭代的速度，进而可能会产生版本不兼容的情况
4. 破坏了封装性

    面向对象封装的定义是：通过访问权限控制，隐藏内部数据，外部仅能通过类提供的有限的接口访问和修改内部数据。也就是说，<u>我们不应该无脑的使用 Lombok 对外暴露所有字段的 Getter/Setter 方法</u>，因为有些字段在某些情况下是不允许直接修改的，比如购物车中的商品数量，它直接影响了购物详情和总价，因此在修改的时候应该提供统一的方法，进行关联修改，而不是给每个字段添加访问和修改的方法。

‍

## 常用注解

### @Getter

#### 修饰类

注解可以放在类上，此时所有的成员变量在编译后都会生成对应的 `get`​ 方法

```java
@Getter
public class User01 {
    private Integer id;
    private String username;
    private Integer age;

    User01() {}

    User01(Integer id, String username, Integer age) {
        this.id = id;
        this.username = username;
        this.age = age;
    }
}
```

测试：

```java
@Test
public void testGetter01() {
    User01 user = new User01(001, "张三", 20);
    System.out.println("id：" + user.getId() + " username：" + user.getUsername() + " age：" + user.getAge());
    // id：1 username：张三 age：20
}
```

‍

#### 修饰成员变量

​​注解只修饰某个成员变量，则只会生成这个变量的 `get`​ 方法

```java
public class User02 {
    /**
     * 注解只修饰某个成员变量，则只会生成这个变量的get方法
     */
    @Getter
    private Integer id;
    private String username;
    private Integer age;

    User02() {}

    User02(Integer id, String username, Integer age) {
        this.id = id;
        this.username = username;
        this.age = age;
    }
}
```

测试：

```java
@Test
public void testGetter02() {
    User02 user = new User02(001, "张三", 20);
    // IDEA中 user.getUsername() 和 user.getAge() 爆红
    System.out.println("id：" + user.getId() + " username：" + user.getUsername() + "age：" + user.getAge());
}

// 执行报错
java: 找不到符号
符号:   方法 getUsername()
位置: 类型为top.dreamagain.TestAnnoGetter.User02的变量 user

java: 找不到符号
  符号:   方法 getAge()
  位置: 类型为top.dreamagain.TestAnnoGetter.User02的变量 user
```

#### 设置访问权限

Lombok 中定义了 6 中访问级别：

1. ​`PUBLIC`​：任何类都可以访问
2. ​`MODULE`​​：在 `Java8`​ 中效果与使用 `PACKAGE`​ ​是一样的
3. ​`PROTECTED`​：同一包中的类和子类能访问
4. ​`PACKAGE`​​：`get`​ 方法无权限修饰符，即默认为 `default`​，同一包中的类可以访问
5. ​`PRIVATE`​：`get`​方法是 `private`​ 级别，本类中的方法可以访问（该类是内部类的话，外部类也可以访问到）
6. ​`NONE`​​：不会生成 `get`​ 方法



```java
public class TestAnnoGetter {

    @Test
    public void testGetter03() {
        User03 user = new User03(001, "张三", 20);
        System.out.println("id：" + user.getId() + " username：" + user.getUsername() + "age：" + user.getAge());
        // @Getter(AccessLevel.NONE) ---> 编译错误
        // @Getter(AccessLevel.PRIVATE) ---> id：1 username：张三age：20
        // @Getter(AccessLevel.PACKAGE) ---> id：1 username：张三age：20
        // @Getter(AccessLevel.PROTECTED) ---> id：1 username：张三age：20
      
    }

    @Getter(AccessLevel.NONE)
    static class User03 {

        private Integer id;
        private String username;
        private Integer age;
  
        User03() {}
  
        User03(Integer id, String username, Integer age) {
            this.id = id;
            this.username = username;
            this.age = age;
        }
    }
}
```

​`@Getter(AccessLevel.PRIVATE)` ​时，同包下不同类中访问

```java
public class TestAnnoGetter02 {
    @Test
    public void testGetter03() {
        TestAnnoGetter.User03 user = new TestAnnoGetter.User03(001, "张三", 20);
        // 编译报错
        // java: getId() 在 top.dreamagain.TestAnnoGetter.User03 中是 private 访问控制
        // java: getUsername() 在 top.dreamagain.TestAnnoGetter.User03 中是 private 访问控制
        // java: getAge() 在 top.dreamagain.TestAnnoGetter.User03 中是 private 访问控制
        System.out.println("id：" + user.getId() + " username：" + user.getUsername() + "age：" + user.getAge());
    }
}
```

#### 懒加载

```java
@Test
public void testGetterLazy() {
    GetterLazyExample obj = new GetterLazyExample();
    System.out.println(obj.getCached());
}

public class GetterLazyExample {
    @Getter(lazy = true)
    private final double[] cached = expensive();
    private double[] expensive() {
        double[] result = new double[1000000];
        for (int i = 0; i < result.length; i++) {
            result[i] = Math.asin(i);
        }
        return result;
    }
}
// 查看编译后的代码
public class GetterLazyExample {
    private final AtomicReference<Object> cached = new AtomicReference();

    public GetterLazyExample() {
    }

    private double[] expensive() {
        double[] result = new double[1000000];

        for(int i = 0; i < result.length; ++i) {
            result[i] = Math.asin((double)i);
        }

        return result;
    }

    public double[] getCached() {
        Object value = this.cached.get();
        if (value == null) {
            synchronized(this.cached) {
                value = this.cached.get();
                if (value == null) {
                    double[] actualValue = this.expensive();
                    value = actualValue == null ? this.cached : actualValue;
                    this.cached.set(value);
                }
            }
        }

        return (double[])((double[])(value == this.cached ? null : value));
    }
}
```

‍

### @Setter

​`@Setter`​与`@Getter`​的使用基本是一致的（没有lazy这个属性），不再赘述

‍

### @ToString

给你的实体类生成`toString`​方法，只能作用在类上

```java
public class TestAnnoToString {
    @Test
    public void testToString() {
        User01 user = new User01(001, "张三", 20);
        System.out.println(user);
        // TestAnnoToString.User01(id=1, username=张三, age=20)
    }

    @ToString
    public class User01 {
        private Integer id;
        private String username;
        private Integer age;

        User01() {}

        User01(Integer id, String username, Integer age) {
            this.id = id;
            this.username = username;
            this.age = age;
        }
    }
}

```

实体类`User01`​经过编译后会添加这样的方法：

```java
public String toString() {
    return "TestAnnoToString.User01(id=" + this.id + ", username=" + this.username + ", age=" + this.age + ")";
}
```

‍

#### 排除字段

​`@ToString(exclude = {})`​，将要不需要再tostring中显示的字段名放到`exclude`​数组中

```java
@Test
public void testToStringExclude() {
    User02 user = new User02(001, "张三", 20);
    System.out.println(user);
    // TestAnnoToString.User02(id=1, username=张三)
}

@ToString(exclude = {"age"})
public class User02 {
    private Integer id;
    private String username;
    private Integer age;

    User02() {}

    User02(Integer id, String username, Integer age) {
        this.id = id;
        this.username = username;
        this.age = age;
    }
}
```

#### 调用父类的toString

```java
@Test
public void testToStringCallSuper() {
    User03 user = new User03(001, "张三", 20);
    System.out.println(user);
    // TestAnnoToString.User03(super=BaseEntity{createdTime=2023-06-11, updatedTime=2023-06-11}, id=1, username=张三, age=20)
}

public class BaseEntity {
    private LocalTime createdTime;
    private LocalTime updatedTime;

    BaseEntity() {

    }

    BaseEntity(LocalTime createdTime, LocalTime updatedTime) {
        this.createdTime = createdTime;
        this.updatedTime = updatedTime;
    }

    @Override
    public String toString() {
        return "BaseEntity{" +
                "createdTime=" + createdTime +
                ", updatedTime=" + updatedTime +
                '}';
    }
}

@ToString(callSuper = true)
public class User03 extends BaseEntity {
    private Integer id;
    private String username;
    private Integer age;

    User03() {
    }

    User03(Integer id, String username, Integer age) {
        super(LocalTime.now(), LocalTime.now());
        this.id = id;
        this.username = username;
        this.age = age;
    }
}
```

‍

## 开发中遇到的问题

‍
