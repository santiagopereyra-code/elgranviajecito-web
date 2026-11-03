import json
items=[("fil_angel","Filipinas y Vietnam","Y es real. Palawan, Filipinas y Vietnam en febrero 2028. Comentá FILIPINAS y te mando el itinerario. #filipinas #palawan #viajesengrupo"),
("tai_navidad","Tailandia y Camboya","El regalo de este año: 16 días en Tailandia y Camboya, octubre 2027. Comentá TAILANDIA y te mando el itinerario. #tailandia #viajesengrupo"),
("egi_nrain","Egipto Total","Lo que se reserva en noviembre se vive en abril. Egipto Total, 13 días. Comentá EGIPTO y te mando el itinerario. #egipto #viajesengrupo"),
("tan_toggle","Tanzania y Zanzíbar","Tarangire, Manyara, Ngorongoro y Serengeti, y después playa en Zanzíbar. Comentá TANZANIA y te mando el itinerario. #safari #tanzania"),
("bal_angel","Bali Relax","Y es real. Tanah Lot y los atardeceres de Bali. Bali Relax, julio 2027. Comentá BALI y te mando el itinerario. #bali #viajesengrupo"),
("ims_reservas","Indonesia, Malasia y Singapur","Singapur, Malasia, Komodo, Gili y Bali en 18 días. Comentá INDONESIA y te mando el itinerario. #indonesia #viajesengrupo"),
("fil_bateria","Filipinas y Vietnam","Recarga completa: Filipinas y Vietnam, febrero 2028. Comentá FILIPINAS y te mando el itinerario. #humorviajero #filipinas"),
("tai_pelicula","Tailandia y Camboya","Tailandia y Camboya, octubre 2027. Comentá TAILANDIA y te mando el itinerario. #tailandia #viajesengrupo"),
("egi_roles","Egipto Total","¿Cuál sos vos? Etiquetá a tu grupo. Egipto Total, abril 2027. Comentá EGIPTO y te mando el itinerario. #humorviajero #egipto"),
("tan_empezo","Tanzania y Zanzíbar","Llegás sin conocer a nadie y te volvés con amigos. Tanzania y Zanzíbar, septiembre 2027. Comentá TANZANIA y te mando el itinerario. #viajarsolo #safari"),
("ims_toggle","Indonesia, Malasia y Singapur","Activada hasta el 30/11. Indonesia, Malasia y Singapur, 18 días. Comentá INDONESIA y te mando el itinerario. #indonesia #viajesengrupo"),
("bal_vlog","Bali Relax","Así es Bali Relax: arrozales, templos, cascadas y Tanah Lot. Julio 2027. Comentá BALI y te mando el itinerario. #bali #viajesengrupo"),
("fil_navidad","Filipinas y Vietnam","Filipinas y Vietnam, febrero 2028. Comentá FILIPINAS y te mando el itinerario. #filipinas #viajesengrupo"),
("tai_bateria","Tailandia y Camboya","Recarga completa: Tailandia y Camboya, octubre 2027. Comentá TAILANDIA y te mando el itinerario. #humorviajero #tailandia"),
("egi_vlog","Egipto Total","Giza y Saqqara en Egipto Total, abril 2027. Comentá EGIPTO y te mando el itinerario. #egipto #viajesengrupo"),
("tan_nrain","Tanzania y Zanzíbar","Lo que se reserva en noviembre se vive en septiembre. Safari y Zanzíbar, 13 días. Comentá TANZANIA y te mando el itinerario. #safari #tanzania"),
("ims_pelicula","Indonesia, Malasia y Singapur","Indonesia, Malasia y Singapur, junio 2027. Comentá INDONESIA y te mando el itinerario. #indonesia #singapur"),
("bal_roles","Bali Relax","¿Cuál sos vos? Etiquetá a tu grupo. Bali Relax, julio 2027. Comentá BALI y te mando el itinerario. #humorviajero #bali"),
("fil_empezo","Filipinas y Vietnam","Llegás sin conocer a nadie y te volvés con amigos. Filipinas y Vietnam, febrero 2028. Comentá FILIPINAS y te mando el itinerario. #viajarsolo #filipinas"),
("tai_reservas","Tailandia y Camboya","Tailandia y Camboya, 16 días en octubre 2027. Comentá TAILANDIA y te mando el itinerario. #tailandia #camboya")]
B="https://cdn.jsdelivr.net/gh/santiagopereyra-code/elgranviajecito-web@publicador/cola/v/"
def mk(k,v,t,h): return {"id":k,"hora":h,"viaje":v,"tipo":"reel_prueba","video":B+k+".mp4","texto":t,"portada_ms":1500}
d3=[];m=19*60
for i,(k,v,t) in enumerate(items[:18]):
    mm=m+15*i; d3.append(mk(k,v,t,f"{mm//60:02d}:{mm%60:02d}"))
d4=[mk(*items[18],"08:30"),mk(*items[19],"09:15")]
json.dump(d3,open('cola/2026-11-03.json','w'),ensure_ascii=False,indent=1)
json.dump(d4,open('cola/2026-11-04.json','w'),ensure_ascii=False,indent=1)
print(d3[0]['hora'],d3[-1]['hora'])
