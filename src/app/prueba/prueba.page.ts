import { Component, OnInit } from '@angular/core';
import { PruebaService } from '../services/prueba.service';
import { ActivatedRoute } from '@angular/router';
import { VideoPlayer } from '@ionic-native/video-player/ngx';

@Component({
  selector: 'app-prueba',
  templateUrl: './prueba.page.html',
  styleUrls: ['./prueba.page.scss'],
})
export class PruebaPage implements OnInit {
  public id: number =0
  public notas= [
    {
      id:1,
      title:'Afganistan',
      subtitle:'¿Que esta pansando en Afganistan?',
      content: "¿Qué son los talibanes en Afganistán\
      Los talibanes se formaron en 1994 por excombatientes de la resistencia afgana llamados muyahidines, que enfrentaron a los invasores soviéticos en los años 80. Su finalidad era aplicar su interpretación de la Ley Islámica y desaparecer las influencias extranjeras. \
      Tras la captura de los talibanes de la capital afgana, Kabul, en 1996, se fijaron reglas estrictas hacia las mujeres, y se prohibió la televisión, la música y las fiestas no islámicas.   \
      En octubre de ese año, después de ataques terroristas, estadounidenses y aliados llegaron a Afganistán, para evitar que Al Qaeda tuviera un refugio seguro y una base de operaciones para actividades terroristas.\
      Tras dos décadas desde que dejaron el poder, los talibanes se han enfrentado a las fuerzas aliadas y al gobierno afgano que respalda Estados Unidos.\
      ¿Por qué los talibanes tomaron Afganistán\
      Los talibanes buscan volver a gobernar Afganistán después de 20 años. Estos religiosos fundamentalistas del Islam comenzaron su avanzada aprovechando que Estados Unidos realizaba su retirada después de la ocupación que iniciaron en 2001. Las fuerzas afganas no pudieron contener a los talibanes que ya controlan la capital Kabul, dispuestos a proclamar un nuevo Emirato Islámico de Afganistán.",
      img:'assets/img/q.webp'
    }, 
    {
      id:2,
      title:'Grace se intensifica a huracán',
      subtitle:'Quintana Roo emite alerta amarilla',
      content: 'La tormenta tropical Grace se intensificó a huracán categoría 1 y avanza rápidamente hacia la Península de Yucatán, por lo que se prevé que toque tierra en durante las primeras horas del jueves, ya que se localiza a 520 kilómetros al este-sureste de Cancún',
      img:'assets/img/2.jpg'
      
    },
    {
      id:3,
      title:'¡Cruz Azul es campeón de la Liga MX!',
      subtitle:'¿Que esta pansando en Afganistan?',
      content: 'La Máquina consigue la novena estrella más de 23 años después.',
      img:'assets/img/c.webp'
    },
    {
      id:4,
      title:'¡Italia, campeón!',
      subtitle:'Italia, campeón de la Eurocopa tras vencer a Inglaterra en penales',
      content: 'Italia ganó su segunda Eurocopa tras derrotar a Inglaterra en los penaltis (1-1 al final del partido) con los fallos de Saka, Jadon Sancho y Marcus Rashford desde los once pasos.',
      img:'assets/img/italia.jpg'
    },
    {
        id:5,
        title:'Podría irme del gobierno con la "conciencia muy tranquila”: AMLO',
        subtitle:'El presidente Andrés Manuel López Obrador durante la inauguración de instalaciones de la Guardia Nacional en San Cristóbal de las Casas',
        content: 'San Cristóbal de las Casas, Chis. Cercano a la mitad de su sexenio, el presidente Andrés Manuel López Obrador sostuvo: “Ya hasta podría irme del gobierno con mi conciencia muy tranquila, porque, saben, ya sería muy difícil a los conservadores a estas alturas, dar marcha atrás a lo que hemos conseguido”',
        img:'assets/img/peje.jpg'
      },
      {
        id:6,
        title:'¡Trump amenaza!',
        subtitle:'Trump amenaza con usar el privilegio ejecutivo mientras una comisión de la Cámara de Representantes busca documentos de las agencias sobre el ataque del 6 de enero',
        content: 'El expresidente Donald Trump ha amenazado este miércoles con invocar el privilegio ejecutivo en un intento de bloquear que la comisión selecta de la Cámara de Representantes que investiga los disturbios del 6 de enero en el Capitolio obtenga una gran cantidad de documentos de varias agencias del Gobierno estadounidense.',
        img:'assets/img/trump.jpg'
      },
      {
        id:7,
          title:'Lanzarán nueva música de Juan Gabriel en 2022',
          subtitle:'ntre los proyectos que dejó pendientes el "Divo de Juárez" son dos discos y algunas producciones inéditas',
          content: 'El abogado Guillermo Pous, espera que sea a principios de 2022 cuando por fin salga a la luz el material discográfico que Juan Gabriel, el "Divo de Juárez", dejó grabado.\
          Pous, representante legal de Iván Aguilera quien es hijo y heredero de Juan Gabriel, detalló cómo va el avance de los próximos productos derivados del trabajo de Juanga a cinco años de su fallecimiento, siendo el material discográfico el que ve más cercano.',
          img:'assets/img/juan.jpg'
        },
        {
          id:8,
          title:'¡Regresa al escenario! Intocable presenta concierto al aire libre en CDMX',
          subtitle:'El grupo Intocable regresa al escenario y se presenta en el Autódromo Hermanos Rodríguez',
          content: 'El Autódromo Hermanos Rodríguez se llena de sombreros y mucho baile con la presentación de grupo Intocable, quien hizo un recorrido musical de todos sus éxitos, los cuales arrancaron suspiros a los enamorados e hicieron derramar lágrimas a los dolidos.\
          Intocable ofrecerá concierto vía streaming \
          Bajo un clima frio y húmedo debido a las fuertes lluvias que cayeron en varios puntos de la Ciudad de México, miles de fanáticos de la banda estadounidense empezaron a llegar al recinto, para disfrutar de un show que habían esperado por más de un año.',
          img:'assets/img/intocable.webp'
        },
        {
          id:9,
          title:'Tecnología contra el cambio climático: eliminar CO2 con la luz solar',
          subtitle:'Principales estrategias y tecnologías contra el cambio climático',
          content: 'Como se puede ver, los mayores esfuerzos se centran en el uso de energías alternativas y métodos de captura de dióxido de carbono. La captura de dióxido de carbono puede llevarse a cabo de dos maneras',
          img:'assets/img/co2.jpg'
        },
        {
          id:10,
          title:'Un robot de hielo con el que explorar otros planetas',
          subtitle:'El IceBot es un innovador dispositivo que puede trabajar en los entornos más gélidos e inhóspitos aprovechando los recursos in situ.',
          content: 'La reciente misión a Marte para el envío del vehículo de exploración Perseverance costó más de dos mil millones de euros. Dotado de ruedas especialmente adaptadas al terreno marciano, se espera que resista las duras condiciones de trabajo. Aunque claro, si una de las ruedas falla, no habrá un taller mecánico al que acudir. Si se pretende abaratar el coste y mejorar la durabilidad de estas misiones',
          img:'assets/img/boot.jpg'
        }
      
  ]
  public notaActual=null
  public titulo: string = "Pagina de prueba"
  constructor(
    private pruebaService: PruebaService,
    private activatedRoute:ActivatedRoute,
    private videoPlayer:VideoPlayer
  ) { }

  ngOnInit() {
    this.id= this.activatedRoute.snapshot.params.id;
    for (let index = 0; index < this.notas.length; index++) {
        if(this.id == this.notas[index].id) {
          this.notaActual=this.notas[index]
            console.log(this.notaActual);
          
        }     
    }
    /*this.videoPlayer.play('https://www.youtube.com/watch?v=qPfZeaGQCS4').then(() => {
    console.log('video completed');
    }).catch(err => {
    console.log(err);
    });*/
  }

}
