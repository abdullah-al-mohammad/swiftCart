\*What is the difference between `null` and `undefined`?

উত্তরঃ null হচ্ছে ডেভেলপার নিজেই value সেট করে, কোন কিছুর value খালি রাখার জন্য।
undefind হচ্ছে value assign করা হয়েছে কিন্তু value পাওয়া যায়নি।

\*What is the use of the `map()` function in JavaScript? How is it different from `forEach()`?

উত্তরঃ দুটোই arry loop করার জন্য ব্যাবহার করা হয়, map প্রতিটা element এর উপর loop চালায় এবং নতুন array return করে।
আর forEach প্রত্যেকটা element এর উপর loop চালায় কিন্তু কোন কিছু return করেনা।

\*What is the difference between `==` and `===`?
উত্তরঃ == শুধু value চেক করে , আর === value এবং type দুটোই চেক করে।

\*What is the significance of `async`/`await` in fetching API data?
উত্তরঃ async function কে Promise return করতে বাধ্য করে। আর await Promise resolve হওয়া পর্যন্ত অপেক্ষা করে। এইটা then এর update version।

\*Explain the concept of Scope in JavaScript (Global, Function, Block).?
উত্তরঃ Scope মানে হলো — কোন জায়গা থেকে কোন variable access করা যাবে।

global-scope যে সকল variable function বা block এর বাইরে declare করা হয় সেগুলো Global Scope এ থাকে, সব জায়গায় এর access পাওয়া যায়।
function-scope যে গুলো variable function এর ভেতরে declare করা হয় এবং function এর ভেতরে এইগুলোর access পাওয়া যায়।
block-scope { } curly braces এর ভিতরে declare করা variable block scope হয়, let এবং const block scoped। let reassaign করা যায় const reassasign করা যায়না।
