== README ==

How to run:
  - Download PHP 5.4 (non-thread safe or thread safe)
    http://windows.php.net/download/#php-5.4
  - Unzip and add to %PATH%
  - Type 'php -S localhost:9000' in the 'root/' folder

  
CakePHP documentation:
  http://book.cakephp.org/2.0/en/contents.html
  http://book.cakephp.org/2.0/en/views.html
  
Less documentation:
  http://lesscss.org/
  
  Please do not use the complicated features of Less. Just stick to variables and mixins.

File structure:
  Layouts
    root\app\View\Layouts
  Pages
    root\app\View\Pages
  CSS
    root\app\webroot\css
  Less
    root\app\webroot\css
  Javascript
    root\app\webroot\js
  Images
    root\app\webroot\img
    
Pages:
  + Start
  + Select Tires/Wheels
  +
    - Year
    - Make
    - Model
    - Body
    - Options
  +
    - Standard Size
    - Optional Wheel Sizes
  + Results
  + Item
    - Specifications
    - Reviews
    - Warranty
    - Financing
    - Email
  + Compare
  + Help me choose
  