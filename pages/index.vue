<script setup lang="ts">
import { Heading, Link, Text } from '@mindenit/ui';
useSeoMeta({
  title: 'Головна | Answers',
});
</script>

<template>
  <div
    class="w-full md:w-[900px] mx-auto flex flex-col gap-5 border-fiord-300 dark:border-fiord-700 border rounded-[40px] py-6 px-10"
  >
    <Heading class="text-center mt-5" size="medium"
      >Вас вітають Mindenit Answers!</Heading
    >
    <Text size="paragraph">
      Як ми і обіцяли, команда
      <Link href="https://t.me/mindenit">Mindenit</Link> продовжує робити все,
      заради полегшення процессу навчання студентів нашого &quot;Першого серед
      кращіх&quot;, тому презентуємо вам <strong>Mindenit Answers</strong>!
    </Text>
    <Heading size="small">Як користуватися платформою?</Heading>
    <Text size="paragraph"
      >Почнемо з того що платформа має декілька режимів роботи.</Text
    >
    <ol class="list-decimal ml-4">
      <li>
        Звичний вам всім каталог, де ви обираючи свій факультет, курс, і
        предмет, можете знайти потрібні вам тести, і переглянути їх повністю.
      </li>
      <li>Режим розумного пошуку, ви пишете питання - отримуєте відповідь.</li>
    </ol>
    <Text size="paragraph">
      Ми проаналізували досвід використання подібних сайтів для наших студентів
      (наприклад emperor.uno), і зрозуміли що можна зробити краще і зручніше.
    </Text>
    <Heading size="small">Як доповнювати платформу?</Heading>
    <Text size="paragraph">
      Найближчим часом ми додамо можливість звичайним студентам відправляти нам
      тести, питання, та конспекти, задля того аби ми могли оперативно додавати
      їх на платформу. Також в майбутньому ми дамо доступ іншим модераторам
      контролювати вміст на платформі.
    </Text>
    <Heading class="text-center" size="medium"
      >Чим можна допомогти зараз?</Heading
    >
    <Text size="paragraph">
      Ви можете надіслати файли тестів, або конспект в наш чат підтримки, треба
      буде відповісти на пару питань, і тоді ми приймемо ваші відповіді.
    </Text>
    <Text size="paragraph">
      Також ви можете надати фінансову підтримку нашій діяльності, і таким чином
      також брати участь в покращені навчального процесу для студентів!
    </Text>
    <ul>
      <li>
        Наш чат підтримки:
        <Link href="https://t.me/mindenit_support"
          >https://t.me/mindenit_support</Link
        >
      </li>
      <li>
        Наша банка на розробку:
        <Link href="https://send.monobank.ua/jar/2hMH9Gr7Dn"
          >https://send.monobank.ua/jar/2hMH9Gr7Dn</Link
        >
      </li>
      <li>
        Наша Монобаза:
        <Link href="https://base.mono.bank/DHfiSksgyjSYDT"
          >https://base.mono.bank/DHfiSksgyjSYDT</Link
        >
      </li>
      <li>Наш PayPal: ketronix2@gmail.com</li>
    </ul>
  </div>
</template>
<style scoped></style>
