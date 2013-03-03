function render_i18n_keys(target) {
	var l = ctk.app.lang ? ctk.app.lang : 'en';
	if ( ! target )
		target = $('body');
	target.find('[data-i18n]').each( function () { 
		try { 
			var t = $(this), 
				key = t.data('i18n'); 
			//console.log('i18n ' + key);
			var keyVal = u_i18n[key][l];
			//console.log(keyVal);
			if ( t.attr('type') == 'submit' )
				t.attr('value', keyVal)
			else if ( t.is('svg')){
				for(var i=0;i<this.getElementsByTagName('text').length;i++){
					this.getElementsByTagName('text')[i].textContent = keyVal;
				}
			}
			else 
				t.html(keyVal);
		} catch(e) { 
			console.error(e);
		}
	});
}

var u_i18n = {
	'home' : {
		'en' : 'home', 
		'fr' : 'accueil',
	},
	'pages' : {
		'en' : 'pages', 
		'fr' : 'pages', 
	},
	'home_page_title' : {
		'en' : 'home page', 
		'fr' : 'accueil',
	},
	'touch_here' : {
		'en' : 'Fran&#231;ais', 
		'fr' : 'English',
	},
	'touch_screen' : {
		'en' : 'Touch screen to start', 
		'fr' : 'Appuyez sur l&apos;&eacute;cran pour commencer',
	},
	'start_txt' : {
		'en' : 'Find the right tires<br/> and wheels for<br/> your vehicle.', 
		'fr' : 'Trouvez les pneus et jantes pour votre v&eacute;hicule.',
	},
	'continue' : {
		'en' : 'continue', 
		'fr' : 'continuez',
	},
	'Continue' : {
		'en' : 'Continue',
		'fr' : 'Continuez'
	},
	'quit' : {
		'en' : 'quit', 
		'fr' : 'quitter',
	},
	'continue_shopping' : {
		'en' : 'Continue Shopping',
		'fr' : 'Continuer les achats',
	},
	'help' : {
		'en' : 'help',
		'fr' : 'aide',
	},
	'appOffline' : {
		'en' : 'THE APPLICATION IS OFFLINE',
		'fr' : 'CETTE APPLICATION EST MOMENTAN&Eacute;MENT INDISPONIBLE',
	}, 
	'size' : {
		'en' : 'Size', 
		'fr' : 'Dimension'
	}, 
	'vehicle' : {
		'en' : 'vehicle',
		'fr' : 'v&eacute;hicule'
	},
	'remove_filter_s' : {
		'en' : 'Remove filter(s)', 
		'fr' : 'Supprimer s&eacute;l&eacute;ctions'
	}, 
	'back' : {
		'en' : 'back', 
		'fr' : 'revenir'
	},
	'BACK' : {
		'en' : 'BACK', 
		'fr' : 'REVENIR'
	}, 
	'narrow_by' : { 
		'en' : 'Narrow by', 
		'fr' : 'Affinez'
	},
	'narrow' : { 
		'en' : 'Narrow by', 
		'fr' : 'Affinez'
	}, 
	'sort_by' : { 
		'en' : 'Sort by', 
		'fr' : ''
	},
	'search_t_by' : { 
		'en' : 'Search tires by', 
		'fr' : 'Chercher un pneu par'
	},
	'search_w_for' : { 
		'en' : 'Search for Wheels', 
		'fr' : 'Trouver des jantes'
	}, 
	'LA' : { 
		'en' : '', 
		'fr' : 'LA '
	},
	'LE' : { 
		'en' : '', 
		'fr' : 'LE '
	}, 
	'Lapos' : { 
		'en' : '', 
		'fr' : 'L&apos;'
	},  
	'search' : {
		'en' : 'search',
		'fr' : 'Chercher'
	},
	'more_filters' : {
		'en' : 'More Filters', 
		'fr' : 'Plus de filtres'
	}, 
	'close' : {
		'en' : 'close', 
		'fr' : 'fermer'
	}, 
	'CLOSE' : {
		'en' : 'CLOSE', 
		'fr' : 'FERMER'
	},
	'help_me_choose' : { 
		'en' : 'Help Me Choose', 
		'fr' : 'Aidez-moi &agrave; choisir'
	}, 
	'guided_tire_selection_tool' : { 
		'en' : 'Guided tire selection tool', 
		'fr' : 'Pour obtenir des recommandations'
	}, 
	'required_fields' : {
		'en' : 'Required Fields',
		'fr' : 'Champs obligatoires'
	},
	'sort_results' : { 
		'en' : 'Sort Results', 
		'fr' : 'Trier par'
	},
	'no-result' : {
		'en' : 'Sorry, there are no items that match your search',
		'fr': 'Il n&apos;y a aucun r&eacute;sultat pour le terme entr&eacute;'
	},
	'search_pre' : {
		'en' : 'Search ',
		'fr': 'Chercher '
	},
	'search_step' : {
		'en' : ' by vehicle - Step ',
		'fr': ' par v&eacute;hicule - &Eacute;tape '
	}, 
	'step' : {
		'en' : ' - Step ',
		'fr': ' - &Eacute;tape '
	}, 
	'search_size' : {
		'en' : ' by size - Step ',
		'fr': ' par dimension - &Eacute;tape '
	},
	'of_de' : {
		'en' : ' of ',
		'fr': ' de '
	}, 
	'select_your_vec' : {
		'en' : 'SELECT YOUR VEHICLE ',
		'fr': 'CHOISISSEZ L&apos;'
	}, 
	'choose_your_vec' : {
		'en' : 'SELECT YOUR VEHICLE ',
		'fr': 'CHOISISSEZ'
	},
	'select_your_whe' : {
		'en' : 'SELECT YOUR WHEELS&apos;S ',
		'fr': 'S&Eacute;LECTIONNEZ L&apos; DE VOTRE PNEU '
	},
	'select_the_whe' : {
		'en' : 'SELECT THE ',
		'fr': 'CHOISISSEZ '
	},
	'select_of_whe' : {
		'en' : ' OF YOUR TIRE',
		'fr': ' DE VOTRE PNEU'
	},
	'Specifications' : {
		'en' : 'Specifications',
		'fr' : 'Sp&eacute;cifications'
	},
	'Product_Reviews' : {
		'en' : 'Product Reviews',
		'fr' : '&Eacute;valuations d&apos;articles'
	},
	'Warranty' : {
		'en' : 'Warranty',
		'fr' : 'Garantie'
	},
	'Email' : {
		'en' : 'Email',
		'fr' : 'Courriel'
	},
	'Print' : {
		'en' : 'Print',
		'fr' : 'Imprimer'
	},
	'Results' : {
		'en' : 'Search Results',
		'fr' : 'R&eacute;sultats'
	},
	'recommended_my' : {
		'en' : 'Recommended size for my ',
		'fr' : 'Dimension recommandée pour mon '
	},
	'privacy_policy' : {
		'en' : 'Privacy Policy',
		'fr' : 'Politique de confidentialit&eacute;'
	},
	'send' : {
		'en' : 'Send',
		'fr' : 'Envoyer'
	},
	'select_size' : {
		'en' : 'Select Size/Style',
		'fr' : 'Choisissez le style ou la dimension'
	},
	'warranty_text' : {
		'en' : '<div class="searchLabel" style="padding-top:22px;">Canadian Tire Customer Care Program<\/div> <div style="margin-top: 50px;">Canadian Tire Corporation, Limited’s Customer Care Program for tires covers the original owner of new passenger or light truck tires which are purchased, installed and balanced at a Canadian Tire (See store staff for complete warranty details).<\/div> <div style="margin-top: 10px;"> <div class="uBold">1. Protection Plan<\/div> <div style="padding: 14px; line-height: 1.5em;">Passenger and light truck tires purchased, installed and balanced at a Canadian Tire Associate Store are covered by a pro-rated Road Hazard Damage and Manufacturing Defects warranty for the life of the usable tread* or five years from the date of purchase, whichever comes first. The original work order/invoice must be presented in order for this warranty to be honoured. Tires purchased, installed and balanced at Canadian Tire also come with new rubber valve stems*, free rotation every 10,000 km and free flat repairs.<\/div><div style="padding: 0px 10px 10px; font-size: .8em;">*Usable tread is the original tread worn down to the level of the tread wear indicators, which is 2/32&#34; of tread remaining.<\/div> <div class="uBold">2. Protection Plan Plus<\/div> <div style="padding: 14px; line-height: 1.5em;">In addition to our basic Protection Plan warranty program, all tires purchased, installed, and balanced at a Canadian Tire Associate store are eligible for our Protection Plan Plus warranty program at an additional cost of $6.99 a tire. Should your tire require replacement due to road hazard damage or manufacturing defect as stated above, we will repair or replace your tire at no charge.<\/div>  <div class="uBold">3. Value Added Services<\/div> <div style="padding: 14px; line-height: 1.5em;"><div>a. Free installation including the removal of old tires and an inspection of the mounting surface for proper seal.<\/div> <div>b. New rubber valve stems.<\/div> <div>c. Free flat repairs.  Repairable damage will be fixed at any Canadian Tire store at no charge.<\/div> <div>d. Free rotation every 10,000 km to ensure even tread wear on all four tires.  We will also inspect for signs of improper or premature wear.<\/div> <div>e. Free brake inspection every 10,000 km.<\/div><\/div> <\/div> ',
		'fr' : '<div class="searchLabel" style="padding-top:22px;">Plan de protection de Canadian Tire<\/div> <div style="margin-top: 50px;">Le Plan de protection pour les pneus de la Soci&eacute;t&eacute; Canadian Tire Limit&eacute;e est offert &agrave; l&apos;acheteur initial de pneus neufs pour voiture de tourisme ou camionnette qui ont &eacute;t&eacute; achet&eacute;s, pos&eacute;s et &eacute;quilibr&eacute;s chez Canadian Tire (voir le magasin pour plus de d&eacute;tails).<\/div> <div style="margin-top: 20px;"> <div class="uBold">1. Plan de protection<\/div> <div  style="padding: 10px; line-height: 1.5em;">Les pneus de voiture de tourisme ou de camionnette achet&eacute;s, pos&eacute;s et &eacute;quilibr&eacute;s dans un magasin associ&eacute; Canadian Tire sont couverts par une garantie au prorata contre les dommages routiers et les d&eacute;fauts de fabrication pendant la dur&eacute;e utile du pneu* ou pendant cinq ans &agrave; compter de la date d&apos;achat, selon la premi&egrave;re &eacute;ventualit&eacute;. Le bon de travail / le re&ccedil;u de caisse d&apos;origine doit &ecirc;tre pr&eacute;sent&eacute;.Des corps de valve neufs*, la permutation tous les 10 000 km et la r&eacute;paration des crevaisons sont compris sans frais avec les pneus achet&eacute;s, pos&eacute;s et &eacute;quilibr&eacute;s chez Canadian Tire. <\/div> <div class="uBold">2. Plan de protection Plus<\/div> <div  style="padding: 10px; line-height: 1.5em;">En plus de notre programme de garantie Plan de protection de base, notre programme de garantie Plan de protection Plus est offert &agrave; des frais additionnels de 6,99 $ le pneu et ce, pour tous pneus achet&eacute;s, pos&eacute;s et &eacute;quilibr&eacute;s dans un magasin associ&eacute; Canadian Tire.Si vous devez remplacer un pneu endommag&eacute; caus&eacute; par un risque routier ou un d&eacute;faut de fabrication tel que mentionn&eacute; plus haut,nous réparerons votre pneu, ou nous le remplacerons, sans frais. <\/div> <div class="uBold">3. Services &agrave; valeur ajout&eacute;e<\/div> <div  style="padding: 10px; line-height: 1.5em;"><div>a. Pose gratuite des pneus, comprenant la mise &agrave; la décharge des vieux pneus et une inspection de la surface de montage.<\/div> <div>b. Corps de valve en caoutchouc neufs.<\/div> <div>c. R&eacute;paration gratuite de crevaisons. Les r&eacute;parations peuvent &ecirc;tre effectu&eacute;es dans tout magasin Canadian Tire et ce, sans frais.<\/div> <div>d. Permutation gratuite des pneus tous les 10 000 km pour assurer une usure uniforme. Nous v&eacute;rifions aussi si les pneus pr&eacute;sentent des signes d&apos;usure in&eacute;gale ou pr&eacute;matur&eacute;e.<\/div> <div>e. Inspection gratuite des freins tous les 10 000 km.<\/div><\/div> <\/div> '
	},
	'warranty_foot' : {
		'en' : 'Thank you for using our Tire and Wheel Selector.  Before making a purchase, please consult one of our Automotive Service Representatives to ensure the product you have selected is the best for your driving needs.',
		'fr' : 'Merci d&apos;avoir utilis&eacute; le s&eacute;lecteur de pneus et jantes. Avant l&apos;achat, veuillez v&eacute;rifier aupr&egrave;s d&apos;un de nos sp&eacute;cialistes de l&apos;automobile que votre pi&egrave;ce  convient &agrave; vos besoins en mati&egrave;re de conduite.'
	},
	'please_bring' : {
		'en' : 'Please bring this slip to the<br\/> Automotive Counter',
		'fr' : 'Veuillez apporter ce feuillet au service de l&apos;automobile'
	},
	'your_store' : {
		'en' : 'Your Store',
		'fr' : 'Votre Magasin'
	},
	'Store' : {
		'en' : 'Store',
		'fr' : 'Magasin'
	},
	'Address' : {
		'en' : 'Address',
		'fr' : 'Adresse'
	},
	'Phone' : {
		'en' : 'Phone',
		'fr' : 'T&eacute;l&eacute;phone'
	},
	'Data_Time' : {
		'en' : 'Date\/Time',
		'fr' : 'Donn&eacute;es\/Temps'
	},
	'Your_Vehicle' : {
		'en' : 'Your Vehicle',
		'fr' : 'Votre V&eacute;hicule'
	},
	'Your_Tire' : {
		'en' : 'Your Selected Tire/Wheel',
		'fr' : 'Votre Pneus/Jantes S&eacute;lectionn&eacute;'
	},
	'Year' : {
		'en' : 'Year',
		'fr' : 'Ann&eacute;e'
	},
	'Vehicle_Make' : {
		'en' : 'Vehicle Make',
		'fr' : 'V&eacute;hicule Marque'
	},
	'Vehicle_Model' : {
		'en' : 'Vehicle Model',
		'fr' : 'V&eacute;hicule Mod&egrave;le'
	},
	'Vehicle_Submodel' : {
		'en' : 'Vehicle Submodel',
		'fr' : 'V&eacute;hicule Sous-Mod&egrave;le'
	},
	'Vehicle_Option' : {
		'en' : 'Vehicle Option',
		'fr' : 'V&eacute;hicule Option'
	},
	'Product_Name' : {
		'en' : 'Product Name',
		'fr' : 'Nom du produit'
	},
	'Product_#' : {
		'en' : 'Product #',
		'fr' : 'Produit #'
	},
	'Vendor_#' : {
		'en' : 'Vendor #',
		'fr' : 'Vendeur #'
	},
	'Price' : {
		'en' : 'Price',
		'fr' : 'Prix'
	},
	'Tire_Size' : {
		'en' : 'Tire Size',
		'fr' : 'Taille des pneus'
	},
	'Disclaimer' : {
		'en' : 'Disclaimer',
		'fr' : 'D&eacute;sistement'
	},
	'p_disclaimer' : {
		'en' : 'When selecting automotive parts for your vehicle, make sure that you have addressed all sizing and other requirements for such parts, including making sure that wheels and tires meet or exceed the load and speed rating of your vehicle&apos;s Original Equipment tires. Please take the time to review your vehicle&apos;s specific information (such as the vehicle&apos;s placard for the Original Equipment tire and rim size) as well as the tires and wheels that are currently installed on your vehicle. We strongly encourage you to consult one of our trained automotive professionals for assistance in selecting the appropriate parts for your vehicle prior to making any purchase decision.<br\/> This tool should not be your sole basis for any purchase decision and is available for users as a guide only. The information conveyed herein is not guaranteed to be error free and has not been endorsed by vehicle manufacturers. The decision on what parts to purchase lies solely with the user and may result in insurance implications. Canadian Tire Corporation, Limited, its affiliates, Canadian Tire Associate Dealers and any of the aforementioned entities&apos; directors, employees, agents and contractors, shall not be liable for the use of this tool which use shall constitute as your acceptance of this disclaimer.',
		'fr' : 'Quand vous choisissez des pi&egrave;ces auto pour un v&eacute;hicule, assurez-vous de tenir compte de toutes les exigences de taille et autres et de vous assurer que des pi&egrave;ces comme les jantes et pneus ont une capacité de charge et une cote de vitesse &eacute;quivalentes ou sup&eacute;rieures &agrave; celles des pneus d&apos;origine. V&eacute;rifiez toutes les informations particuli&egrave;res au v&eacute;hicule figurant entre autre sur le montant de porte pour les dimensions des jantes et pneus d&apos;origine ainsi que les jantes et pneus actuellement sur le v&eacute;hicule. Nous vous conseillons fortement de vous faire aider par nos professionnels qualifi&eacute;s pour choisir les pi&egrave;ces qui conviennent &agrave; votre v&eacute;hicule avant de prendre toute d&eacute;cision d&apos;achat.<br\/> Vous ne devriez pas baser votre décision d&apos;achat sur cet outil seulement, il est offert uniquement &agrave; titre de guide. Les renseignements donn&eacute;s ne sont pas garantis sans erreur et n&apos;ont pas &eacute;t&eacute; garantis par le constructeur du v&eacute;hicule. La décision d&apos;acheter une pi&egrave;ce appartient enti&egrave;rement &agrave; l&apos;utilisateur et peut avoir des r&eacute;percussions sur son assurance. La Soci&eacute;t&eacute; Canadian Tire Limit&eacute;e, ses affili&eacute;s, les marchands associ&eacute;s Canadian Tire, tous les directeurs, employ&eacute;s, agents et repr&eacute;sentants des entit&eacute;s pr&eacute;cit&eacute;es ne seront pas tenus responsables d&apos;aucune mani&egrave;re que ce soit de l&apos;utilisation de cet outil et l&apos;utilisation de cet outil par un individu constitue l&apos;acceptation par l&apos;individu de ce déni de responsabilit&eacute;'
	},
	'pop_disclaimer' : {
		'en' : 'Please note you have not entered a speed rating and/or load index for your tire search. Continuing your search without listing the factory required speed rating and load index could result in unsafe operation or poor handling characteristics for your vehicle.<br\/><br\/> Canadian Tire shall not be liable in any way for the recommendations provided through this tool or your reliance on such recommendations.',
		'fr' : 'Vous n&apos;avez pas précisé de cote de vitesse ni d&apos;indice de charge dans votre recherche de pneu. Si vous n&apos;entrez pas ces critères de recherche, le système pourrait vous suggérer des pneus qui nuiraient à la sécurité de votre véhicule ou à sa tenue de route.<br\/><br\/> Canadian Tire ne sera pas tenue responsable d&apos;aucune manière que ce soit de l&apos;utilisation de cet outil.'
	},
	'Disclaimer_title' : {
		'en' : 'Use of Fitment Data in Tire\/Wheel Selector',
		'fr' : 'Utilisation des donn&eacute;es de taille dans le s&eacute;lecteur de pneus\/jantes'
	},
	'InStore_Device' : {
		'en' : 'In-Store Tire Selector Device',
		'fr' : 'En Magasin Appareil de Pneu S&eacute;lecteur'
	},
	'no_review' : {
		'en' : 'Any Review found for this product',
		'fr' : 'Aucune Commentaire Trouv&eacute;'
	},
	'add_product' : {
		'en' : 'Add Product',
		'fr' : 'Ajouter un article'
	},
	'remove_product' : {
		'en' : 'Remove Product',
		'fr' : 'Supprimer l&apos;article'
	},
	'no_more_4' : {
		'en' : 'You can only add 4 items for comparison.',
		'fr' : 'Vous ne pouvez comparer que 4 articles &agrave; la fois.'
	},
	'Compare' : {
		'en' : 'Compare ',
		'fr' : 'Comparez '
	},
	'Compare_Items' : {
		'en' : 'Compare Items',
		'fr' : 'Comparez'
	},
	'Compare_Items_Txt' : {
		'en' : 'items by tapping compare icon',
		'fr' : 'articles en appuyant sur Comparer'
	},
	'compare_a' : {
		'en' : ' - ',
		'fr' : ' &agrave; '
	},
	'Financing' : {
		'en' : 'No Interest Financing',
		'fr' : 'Financement sans int&eacute;r&ecirc;t'
	},
	'financing_text' : {
		'en' : '<div class="searchLabel" style="padding-top:70px;">Pay Over One Year*</div><div style="margin-top: 10px;">When you use your Canadian Tire Options<sup>®</sup> MasterCard<sup>®</sup>. Just make any tire and auto service purchase over $150 today!</div><div style="margin-top: 20px;"><div class="uBold">12 EQUAL PAYMENTS*</div><div style="padding: 14px; line-height: 1.5em;">Pay in 12 equal payments, rather than all at once at the time of purchase.</div><div class="uBold">NO INTEREST*</div><div style="padding: 14px; line-height: 1.5em;">Pay no interest for 12 months on the amount financed. No retroactive interest.</div><div class="uBold">NO FEE*</div><div style="padding: 14px; line-height: 1.5em;">There is no fee charged for entering into an equal payments plan.</div><div style="padding: 0 14px; line-height: 1.5em; font-size: 0.76em;"><div style="margin-bottom:10px;">*Equal payments, no interest for 12 months is only available on request and on approved credit on a Canadian Tire store purchase of tires and auto service totalling $150 or more (excluding gift cards) made on a Canadian Tire Options® MasterCard®. Interest does not accrue during the period of the plan. However, if we do not receive the full minimum due on a statement within 59 days of the date of that statement, or any event of default (other than a payment default) occurs under your Cardmember Agreement, all equal payments plans on your account will terminate and (i) you will then be charged interest on the balances outstanding on such plans at the applicable regular annual rate from the day after the date of your next statement, and (ii) the balances outstanding will form part of the balance due on that statement. Each month during an equal payments plan you are required to pay in full by the due date that month’s equal payments plan instalments. Any unpaid portion not received by the due date will no longer form part of the equal payments plan and interest will accrue on that amount from the day after the date of your next statement at the applicable regular annual rate. There is no administration fee charged for entering into an equal payments plan.</div><div><b>Additional information for residents of Quebec only: </b> The regular annual rate for persons applying for the Options MasterCard is 21.99% for cash advances and related fees and 19.99% for all other charges. Some applicants may receive a higher or lower regular annual rate depending on a credit evaluation. The minimum payment is the sum of (a) interest and fees shown on your statement, (b) the greater of any amount past due or any balance over your credit limit, (c) the amount of any equal payments plan instalments then due, and (d) $10. Balances under $10 are due in full. For residents of Quebec, the period between the statement date and the due date for payment is 26 days. The billing period covered by each statement can be from 28-33 days. The Options MasterCard does not have an annual fee. Examples of borrowing costs (rounded to the nearest cent) assuming that all charges are purchases bearing interest at the regular annual rate of 19.99%, a 30 day month, no charges made on special payment plans and no other fees, additional payments or other changes are:</div><div><table><tr><td>If your average balance is: </td><td>$100</td><td>$500</td><td>$1000</td><td>$2000</td></tr><tr><td>Total monthly credit charges will be: </td><td>$1.64</td><td>$8.22</td><td>$16.43</td><td>$32.86</td></tr></table><div style="margin-top: 10px;">®/TM Canadian Tire, the Canadian Tire triangle design, and Canadian Tire Options are registered trademarks, and Driving Made Easier is a trademark, of Canadian Tire Corporation, Limited used under licence.</div><div>MasterCard® is a registered trademark of MasterCard International Incorporated, used under licence.</div></div></div> ',
		'fr' : '<div class="searchLabel" style="padding-top:65px;">Payez sur une ann&eacute;e*<\/div><div style="margin-top: 10px;">Lorsque vous utilisez votre carte MasterCard<sup>MC</sup> Options<sup>MC</sup> de Canadian Tire. Effectuez simplement un achat de pneus ou de services automobiles de 150 $ ou plus!<\/div><div style="margin-top: 20px;"><div class="uBold">12 PAIEMENTS &Eacute;GAUX* <\/div><div style="padding:  10px 14px; line-height: 1.5em;">R&eacute;glez votre achat en 12 paiements &eacute;gaux, au lieu de payer le total en une seule fois au moment de l&apos;achat.<\/div><div class="uBold">AUCUN INT&Eacute;R&Ecirc;T*<\/div><div style="padding: 10px 14px; line-height: 1.5em;">Aucun int&eacute;r&ecirc;t pendant 12 mois sur le montant financ&eacute;. Aucun int&eacute;r&ecirc;t r&eacute;troactif.<\/div><div class="uBold">AUCUNS FRAIS*<\/div><div style="padding: 10px 14px; line-height: 1.5em;">Les programmes de paiements &eacute;gaux ne comportent aucuns frais d&apos;administration.<\/div><div style="padding: 0 14px; line-height: 1.5em; font-size: 0.75em;"><div>* L&apos;offre de paiements &eacute;gaux et d&apos;aucun int&eacute;r&ecirc;t pendant 12 mois peut &ecirc;tre accord&eacute;e sur demande seulement et sur approbation du cr&eacute;dit pour les achats de 150 $ ou plus de pneus et de services automobiles effectu&eacute;s dans un magasin Canadian Tire (&agrave; l&apos;exception des cartes-cadeaux) et r&eacute;gl&eacute;s avec une carte MasterCard<sup>MD</sup> Options<sup>MD</sup> de Canadian Tire. Aucun int&eacute;r&ecirc;t ne court pendant la p&eacute;riode du programme. Toutefois, si nous ne recevons pas le montant int&eacute;gral du paiement minimum d&ucirc; indiqu&eacute; sur un relev&eacute; dans les 59 jours qui suivent la date de ce relev&eacute;, ou s&apos;il se produit une situation de manquement (autre que celle de ne pas avoir effectu&eacute; un paiement) en vertu de votre contrat du titulaire de carte, tous les programmes de paiements &eacute;gaux li&eacute;s &agrave; votre compte prendront fin et i) l’int&eacute;r&ecirc;t sur le solde impay&eacute; en vertu de ces programmes vous sera factur&eacute; au taux annuel courant applicable &agrave; compter du jour qui suit la date de votre prochain relev&eacute;, ou ii) le solde impay&eacute; de chaque programme sera ajout&eacute; au solde d&ucirc; pour ce relev&eacute;. Chaque mois pendant la p&eacute;riode d&apos;un programme de paiements &eacute;gaux, vous devez payer int&eacute;gralement, avant la date d&apos;&eacute;ch&eacute;ance, le montant du versement mensuel d&ucirc; en vertu de ce programme de paiements &eacute;gaux. Tout montant impay&eacute; non reçu avant la date d&apos;&eacute;ch&eacute;ance ne fera plus partie du programme de paiements &eacute;gaux, et l&apos;int&eacute;r&ecirc;t vous sera factur&eacute; sur ce montant &agrave;compter du jour qui suit la date de votre relev&eacute; suivant au taux annuel courant applicable. Les programmes de paiements &eacute;gaux ne comportent aucuns frais d&apos;administration. <\/div><div><b>Renseignements suppl&eacute;mentaires &agrave; l&apos;intention des r&eacute;sidents du Qu&eacute; bec seulement: </b> Le taux annuel courant applicable aux personnes demandant la carte MasterCard Options est de 21,99% pour les avances de fonds et les frais aff&eacute;rents et de 19,99% pour tous les autres types de d&eacute;bit. Certaines personnes peuvent se voir accorder un taux annuel courant suprieur ou inf&eacute;rieur, selon leurs ant&eacute;c&eacute;dents de cr&eacute;dit. Le paiement minimum correspond &agrave; la somme (a) de l&apos;int&eacute;r&ecirc;t et des frais indiqu&eacute;s sur le relev&eacute;, (b) de tout montant impay&eacute; ou, s&apos;il est plus &eacute;lev&eacute;, de tout solde d&eacute;passant la limite de cr&eacute;dit, (c) du montant de tout versement alors d&ucirc; en vertu d&apos;un programme de paiements &eacute;gaux, et (d) de 10$. Un solde inf&eacute;rieur&agrave; 10$ doit &ecirc;tre r&eacute;gl&eacute; int&eacute;gralement.  Pour les r&eacute;sidents du Qu&eacute;bec, le d&eacute;lai de gr&acirc;ce entre la date du relev&eacute; et la date d&apos;&eacute;ch&eacute;ance du paiement est de 26 jours. La p&eacute;riode de facturation couverte par chaque relev&eacute; peut aller de 28 &agrave; 33 jours. La carte MasterCard Options ne comporte pas de frais annuels. Exemples de co&ucirc;ts d&apos;emprunt (arrondis au cent le plus proche) en supposant que tous les d&eacute;bits portent int&eacute;r&ecirc;t au taux annuel courant de 19,99%, que le mois comporte 30 jours, qu&apos;aucun achat ne fait l&apos;objet d’un programme de modalit&eacute;s sp&eacute;ciales de paiement et qu&apos;aucuns autres frais, paiements additionnels ou changements ne s&apos;appliquent:</div><div><table><tr><td>Si votre solde moyen est de:  </td><td>$100</td><td>$500</td><td>$1000</td><td>$2000</td></tr><tr><td>Le total des frais de cr&eacute;dit mensuels sera de: </td><td>$1.64</td><td>$8.22</td><td>$16.43</td><td>$32.86</td></tr></table></div><div style="margin-top: 10px;"><sup>MD/MC</sup> Canadian Tire, le triangle de Canadian Tire et Options de Canadian Tire sont des marques de commerce d&eacute;pos&eacute;es de La Soci&eacute;t&eacute; Canadian Tire Limit&eacute;e et sont utilis&eacute;es sous licence.</div><div>MasterCard<sup>MD</sup> est une marque de commerce d&eacute;pos&eacute;e de MasterCard International Incorporated, utilis&eacute;e sous licence.</div><\/div><\/div>  '
	},
	'previous_step' : { 
		'en' : 'Previous Step', 
		'fr' : '&Eacute;tape pr&eacute;c&eacute;dente'
	}, 
	'Accept' : {
		'en' : 'Accept',
		'fr' : 'Accepter'
	},
	'Cancel' : {
		'en' : 'Cancel',
		'fr' : 'Annuler'
	}, 
	'use_of_data' : {
		'en' : 'Use of Fitment Data in Tire\/Wheel Selector ',
		'fr' : 'Utilisation des données de taille dans le s&eacute;lecteur de pneus\/jantes '
	},
	'Configure_Device' : {
		'en' : 'Configure Device',
		'fr' : 'Configurer le kiosque'
	},
	'Device_ID' : {
		'en' : 'Device ID',
		'fr' : 'No de kiosque'
	},
	'Store_ID' : {
		'en' : 'Store ID',
		'fr' : 'No de magasin'
	},
	'Save' : {
		'en' : 'Save',
		'fr' : 'Sauvegarder'
	},
	'Debug' : {
		'en' : 'Debug',
		'fr' : 'D&eacute;bogage'
	},
	'Production_Mode' : {
		'en' : 'Production Mode',
		'fr' : 'Mode production'
	},
	'Debug_Mode' : {
		'en' : 'Debug Mode',
		'fr' : 'Mode d&eacute;bogage'
	},
	'Enable' : {
		'en' : 'Enable',
		'fr' : 'D&eacute;bogage'
	},
	'Disable' : {
		'en' : 'Disable',
		'fr' : 'Supprimer d&eacute;bogage'
	},
	'Remote_Debug' : {
		'en' : ' Remote Debug',
		'fr' : ' &agrave; distance'
	},
	'Enable_Remote_Debug' : {
		'en' : 'Enable Remote Debug',
		'fr' : 'D&eacute;bogage &agrave; distance'
	},
	'Main' : {
		'en' : 'Main',
		'fr' : 'Primaire'
	},
	'Pre_Live' : {
		'en' : 'Pre-Live',
		'fr' : 'Pr&eacute;liminaire'
	},
	'Live' : {
		'en' : 'Live',
		'fr' : 'En direct'
	},
	'Back' : {
		'en' : 'Back',
		'fr' : 'Retour'
	},
	'Print_Sample_Receipt' : {
		'en' : 'Print Sample Receipt',
		'fr' : 'Imprimer une copie'
	},
	'Send_Logs_to_UN' : {
		'en' : 'Send Logs to UN',
		'fr' : 'Envoyer les erreurs &agrave; UN'
	},
	'Clear_Logs' : {
		'en' : 'Clear Logs',
		'fr' : 'Supprimer les erreurs'
	}
}