# Diseñar Web Part

## Añadir modelo y origen de datos
Aunque en la realidad los datos los deberíamos obtener desde una fuente "externa" mediante una consulta a alguna Api, en este caso para simplificar dispondremos de la colección dentro del fichero en el que declaramos el modelo.
- Dentro de la carpeta *src/webparts* crear una subcarpeta llamada *model*
- Crear un fichero llamado ISaints.ts o descargarlo desde [este enlace](https://github.com/CompartiMOSS/Microsoft-365-Developer-Bootcamp-Virtual/blob/master/Track1/spfx-webpart-design/code/coolwebpart/src/webparts/model/ISaints.ts)
### En caso de haberlo creado
- añadir las siguientes interfaces

```javascript
export interface ISaintProps {
   id: number;
   name: string;
   picture: string;
   bio: string;
   strength: number;
   skills?: string;
   constellation: string;
   class: string;
}

export interface ISaint {
   saint: ISaintProps;
}

export interface ISaints {
   saints: ISaintProps[];
}
```
- Crear una colección de elementos siguiendo el ejemplo:

```javascript
export var saintsList: ISaints = 
{"saints": [
   {
       "id": 1, 
       "strength": 18,  
       "name": "Seiya",    
       "class": "Bronze",
       "picture": "https://saintseiya-cdn.gaming.ph/images/thumb/1/1f/Seiya-full.jpg/x256px-Seiya-full.jpg.pagespeed.ic.adsIjSa-7K.webp", 
       "skills": "Seiya, a powerful single damage dealer in the early stage, may become a support character in the later stage by putting enemies in a weakened state with his Pegasus Comet Fist, allowing other Saints to deal even higher damage.",
       "bio": "In order to maintain justice and protect Athena, he is willing to sacrifice everything and won't give up easily. His firm will and unyielding faith is contagious to everyone around him, and he is the spiritual leader of the Five Bronze Saints.",
       "constellation": "Pegasus"
   },
   { NEXT ELEMENTS }...
]}
```

## Añadir componentes para visualizar la lista de elementos
### Añadir componente de lista
- Crear subcarpeta *saint* dentro de la carpeta *components*
- Añadir fichero saintList.tsx con el contenido

```javascript
import * as React from 'react';
import styles from '../CoolWebPart.module.scss';
import { ISaintProps, ISaints, ISaint, saintsList } from '../../../model/ISaints';

interface IListProps {
   saints: ISaintProps[];
 }
 
export const SaintList =  (props: IListProps) => {
   return (
     <>
       <ul>
         <li key={-1}>
           <div></div>
           <div>Saint</div>
           <div>Constellation</div>
           <div>Class</div>
           <div>Strength</div>
           <div></div>
         </li>
 
         {props.saints.map((item, index) => {
           return (
            <li>{item.name}</li>
           );
         })}
       </ul>
     </>
   );
 };
 
```
- En el componente del webpart CoolWebPart.tsx, añadir el import del componente de lista:
```javascript
import { ISaintProps, ISaints, ISaint, saintsList } from '../../model/ISaints';
import { SaintList } from './saint/saintList';
```
- En el render de CoolWebPart.tsx, sustituir el contenido del return por:

```javascript
<>
      <SaintList  saints={saintsList.saints}/>
</>
```

### Añadir componente individual
- Crear fichero saint.tsx dentro de la misma carpeta anterior con el contenido

```javascript
import * as React from 'react';
import styles from '../CoolWebPart.module.scss';
import { ISaintProps, ISaints, ISaint, saintsList } from '../../../model/ISaints';
import { Rating, RatingSize, IRatingStyles } from 'office-ui-fabric-react/lib/Rating';

export const Saint = (props: ISaint, key: number) => {
   return (
     <>
       <li key={key}>
         <div>{props.saint.name}</div>
         <div>{props.saint.constellation !== '' ? props.saint.constellation : '-' }</div>
         <div>{props.saint.class}</div>
         <div><span className={styles.galleryOnly}>Strength: </span>{props.saint.strength}</div>
       </li>
     </>
   );
 };
```

- En el componente del listado, sustituir la línea: 

```javascript
<li>{item.name}</li>
```
- Por:

```javascript
<Saint saint={item} key={index} />
```

- Añadir el import del componente individual en la cabecera del componente de lista
import { Saint } from './saint';

### Añadir filtros y modo de vista
- Crear la subcarpeta *filters* dentro de *components*
- Crear el fichero filter.tsx con el siguiente contenido

```javascript
import * as React from 'react';
import styles from '../CoolWebPart.module.scss';
import { ISaintProps, ISaints, ISaint, saintsList } from '../../../model/ISaints';
import { Dropdown, DropdownMenuItemType, IDropdownStyles, IDropdownOption } from 'office-ui-fabric-react/lib/Dropdown';

interface IFilterProps {
   saints: ISaintProps[];
   handleFilter: (key:string) => any;
 }
 
 export const Filter = (props: IFilterProps) => {
   const options: IDropdownOption[] = [
     { key: 'All', text: 'All Saints' },
     { key: 'Bronze', text: 'Bronze' },
     { key: 'Silver', text: 'Silver' },
     { key: 'Gold', text: 'Gold' },
     { key: 'Legendary', text: 'Legendary' }
   ];
   const dropdownStyles: Partial<IDropdownStyles> = {
     dropdown: { width: 300 },
   };
 
   function onSelectClass (event: React.FormEvent<HTMLDivElement>, option?: IDropdownOption, index?: number) {
     if (option != null) {
       props.handleFilter(option.key.toString());
     }
   }
 
   return (
     <>
       <Dropdown
         placeholder="All Saints"
         defaultSelectedKeys={["All"]}
         label="Filter Saints"
         options={options}
         styles={dropdownStyles}
         onChange={onSelectClass} />
     </>
   );
 };
 
```
#### Dentro del componente CoolWebPart.tsx añadir lo siguiente:
- En la clase del componente añadir los siguientes métodos

```javascript
  constructor(props) {
    super(props);
    this.state = { 
      saintsFiltered: saintsList.saints, 
      styleViewMode: this.props.viewMode === 'GALLERY' ? styles.GALLERY : styles.LIST,
      viewMode: this.props.viewMode === 'GALLERY' ? styles.GALLERY : styles.LIST      
    };
    this.FilterSaints = this.FilterSaints.bind(this);
    this.setViewMode = this.setViewMode.bind(this);
  }

  public FilterSaints(key: string) {
    if (key === 'All') {
      this.setState(() => {  
        return { saintsFiltered: saintsList.saints };  
      });
    } else {
      this.setState(() => {  
        return { saintsFiltered: saintsList.saints.filter((saint) => { return saint.class === key;}) };  
      });
    }
  }

  private setViewMode(newViewMode: string) {
    this.setState({
      viewMode: newViewMode,
      styleViewMode: newViewMode === 'GALLERY' ? styles.GALLERY : styles.LIST
    });
  }
```

- En el render, cambiar la llamada al componente de lista por la siguiente línea, además del filtro

```javascript
   <Filter saints={this.state.saintsFiltered} handleFilter={this.FilterSaints} /> 
   <SaintList saints={this.state.saintsFiltered} viewMode={this.state.viewMode}/>
```

- Importar el nuevo componente de filtro
```javascript
import { Filter } from './filters/filter';
```

- Añadir la propiedad "modo de vista" a la interfaz del componente de lista
```javascript
interface IListProps {
  viewMode: string;
  saints: ISaintProps[];
}
```
## Añadir estilos
- Añadir el contenido del fichero CoolWebPart.module.scss de [este enlace](https://github.com/CompartiMOSS/Microsoft-365-Developer-Bootcamp-Virtual/blob/master/Track1/spfx-webpart-design/code/coolwebpart/src/webparts/coolWebPart/components/CoolWebPart.module.scss) al módulo de estilos de nuestro webpart principal.
- Importar los estilos desde los componentes de lista y de elemento *saintList.tsx* y *saint.tsx*
```javascript
import styles from '../CoolWebPart.module.scss';
```
- En el return del componente de lista *saintList.tsx* sustituir el código por el siguiente:
```javascript
      <ul className={styleViewMode}>
        <li key={-1} className={[styles.listOnly, styles.listHeader].join(' ')}>
          <div></div>
          <div>Saint</div>
          <div>Constellation</div>
          <div>Class</div>
          <div>Strength</div>
          <div></div>
        </li>

        {props.saints.map((item, index) => {
          return (<Saint saint={item} key={index} />);
        })}
      </ul>
```
- En el return del componente individual *saint.tsx* sustituir el código por:

```javascript
       <li key={key} style={{ backgroundImage: `url(${props.saint.picture})` }}>
         <div className={styles.saintPicture} style={{ backgroundImage: `url(${props.saint.picture})` }}></div>
         <div className={styles.saintName}>{props.saint.name}</div>
         <div>{props.saint.constellation !== '' ? props.saint.constellation : '-' }</div>
         <div>{props.saint.class}</div>
         <div><span className={styles.galleryOnly}>Strength: </span>{props.saint.strength}</div>
       </li>
```

- En el método render del componente CoolWebPart.tsx, sustituir el código del return por:
```javascript
        <div className={[styles.saintsContainer, this.state.styleViewMode].join(' ')}>
          <Filter saints={this.state.saintsFiltered} handleFilter={this.FilterSaints} /> 
          <SaintList saints={this.state.saintsFiltered} viewMode={this.state.viewMode}/>
        </div>
```

### Añadir panel de resumen
- Dentro de la carpeta components, crear una subcarpeta llamada *dashboard*
- Crear fichero llamado dashboard.tsx con el siguiente contenido:

```javascript
import * as React from 'react';
import styles from '../CoolWebPart.module.scss';

interface IDashboardProps {
   saints: number;
   bronzeSaints: number;
   silverSaints: number;
   goldSaints: number;
   legendarySaints: number;
   strengthAvg: number;
 }
 
export const Dashboard = (props: IDashboardProps) => {
   return (
     <div className={styles.dashboard}>
       <div className={styles.kpiRow}>
         <div className={styles.kpiPanel}>
           <div className={styles.kpiTitle}>Saints:</div><div className={styles.kpiValue}>{props.saints}</div>
         </div>
         <div className={styles.kpiPanel}>
           <div className={styles.kpiTitle}>Strength average:</div><div className={styles.kpiValue}>{props.strengthAvg}</div>
           </div>
       </div>
       <div className={styles.kpiRow}>
         <div className={styles.kpiPanel}>
           <div className={styles.kpiTitle}>Bronze Saints:</div><div className={styles.kpiValue}>{props.bronzeSaints}</div>
         </div>
         <div className={styles.kpiPanel}>
           <div className={styles.kpiTitle}>Silver Saints:</div><div className={styles.kpiValue}>{props.silverSaints}</div>
         </div>
         <div className={styles.kpiPanel}>
           <div className={styles.kpiTitle}>Gold Saints:</div><div className={styles.kpiValue}>{props.goldSaints}</div>
         </div>
         <div className={styles.kpiPanel}>
           <div className={styles.kpiTitle}>Legendary Saints:</div><div className={styles.kpiValue}>{props.legendarySaints}</div>
         </div>
       </div>
     </div>
   );
 };
```

## Añadir propiedades de configuración en modo edición
Para modificar las propiedades que queremos mostrar en el panel de edición del Web Part, tendremos que trabajar con el fichero del contenedor del propio webpart, esto es, *CoolWebPartWebPart.tsx* y la interfaz *ICoolWebPartWebPartProps* definida al inicio del fichero.
- En primer lugar, tenemos que añadir las propiedades a la interfaz, en este caso, título y descripción.
```javascript
export interface ICoolWebPartWebPartProps {
  title: string;
  description: string;
  viewMode: string;
}
```
- Seguidamente podremos hacer uso de estas propiedades dentro del panel que se muestra con el método *getPropertyPaneConfiguration*. En este método se definen tanto el número de paneles, como los grupos y las propiedades que contiene. Podemos jugar con las colecciones para probar la mejor distribución de las propiedades que deseamos tener en modo edición en nuestros Web Parts.  En este caso, tendremos un único panel con dos grupos de propiedades definidos tal como se muestra en el código a continuación:

```javascript
  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: [
        {
          header: {
            description: strings.PropertyPaneSettings
          },
          groups: [
            {
              groupName: strings.PropertiesGroupName,
              groupFields: [
                PropertyPaneTextField('title', {
                  label: strings.TitleFieldLabel
                }),
                PropertyPaneTextField('description', {
                  label: strings.DescriptionFieldLabel
                })
              ]
            },
            {
              groupName: strings.AdvancedGroupName,
              groupFields: [ 
                PropertyPaneDropdown('viewMode', {
                  label: strings.ViewModeFieldLabel,
                  options: [
                    {key: 'GALLERY', text: 'Gallery'},
                    {key: 'LIST', text: 'List'}
                  ],
                  selectedKey: 'LIST'
                }),
              ]
            },
          ]
        }
      ]
    };
  }
```

### Añadir localización de elementos
El código anterior nos generará error ya que aún no hemos establecido el texto localizado por idioma que se encuentra definido en los ficheros de la carpeta *loc*
- Primero definimos los pares "clave:valor" de los textos traducidos en los ficheros javascript con el código de idioma:

```javascript
define([], function() {
  return {
    "PropertyPaneSettings": "Settings",
    "PropertiesGroupName": "Properties",
    "AdvancedGroupName": "Advanced properties",
    "TitleFieldLabel": "Title",
    "DescriptionFieldLabel": "Description",
    "ViewModeFieldLabel": "View mode"
  }
});
```
- Posteriormente es necesario actualizar las propiedades localizadas en el fichero *mystrings.d.ts* que quedaría de la siguiente forma:

```javascript
declare interface ICoolWebPartWebPartStrings {
  PropertyPaneSettings: string,
  PropertiesGroupName: string,
  AdvancedGroupName: string,
  TitleFieldLabel: string,
  DescriptionFieldLabel: string,
  ViewModeFieldLabel: string
}

declare module 'CoolWebPartWebPartStrings' {
  const strings: ICoolWebPartWebPartStrings;
  export = strings;
}
```

## Añadir elementos de FluentUI
Para poder sacar todo el jugo a los Web Parts, debemos hacer uso de los estilos y componentes de FluentUI, antes conocido como OfficeUI.Fabric. En nuestro caso, ya hemos hecho uso del DropDown y, como podemos ver, usar un control de FluentUI se realiza de forma sencilla, aunque siempre se puede complicar dependiendo del control y de la personalización que le queramos aplicar.

### Añadir rating
Dado que disponemos de un valor numérico con el ratio de fuerza de cada uno de los elementos, podemos traducir esto de forma inmediata a un control de tipo rating.
- En el componente saint.tsx, añadiremos un import para poder hacer uso del rating

```javascript
import { Rating, RatingSize, IRatingStyles } from 'office-ui-fabric-react/lib/Rating';
```

-Añadimos el control Rating como último elemento dentro del *li* con los parámetros de configuración necesarios para que se comporte como deseamos

```javascript
        <Rating
            min={1}
            max={5}
            size={RatingSize.Large}
            rating={props.saint.strength / 4.5}
            readOnly={true}
            ariaLabelFormat={'{0} of {1} strength level'}
            styles={{ratingStarFront: {color: strengthColor}, ratingStarBack: {color: "#f0f0f0"}}}
          />
```

### Añadir barra de comandos
Si queremos añadir un elemento de mayor complejidad y con más posibilidades de configuración, podemos optar por usar la barra de comandos que, además, puede ser bastante habitual en nuestros desarrollos si trabajamos con Web Parts que queremos que permitan la interación con los usuarios en la vista de lectura.
- En el componente *CoolWebPart.tsx*  añadimos los import necesarios

```javascript
import { CommandBar, ICommandBarItemProps } from 'office-ui-fabric-react/lib/CommandBar';
```

- Dentro del método render de la clase del componente, añadirmos al inicio las siguientes constantes.

```javascript

    const _farItems: ICommandBarItemProps[] = [
      {
        key: 'tile',
        text: 'Grid view',
        // This needs an ariaLabel since it's icon-only
        ariaLabel: 'Grid view',
        iconOnly: true,
        iconProps: { iconName: 'Tiles' },
        onClick: () => {
          console.log('Tiles'); 
          console.log(this.state.viewMode);
          if (this.state.viewMode === 'GALLERY') {
            this.setViewMode('LIST');
          } else { 
            this.setViewMode('GALLERY');
          }
        },
      },
      {
        key: 'info',
        text: 'Info',
        // This needs an ariaLabel since it's icon-only
        ariaLabel: 'Info',
        iconOnly: true,
        iconProps: { iconName: 'Info' },
        onClick: () => console.log('Info'),
      },
    ];
```

- Por último, añadimos el componente, antes del Dashboard, para que nos quede en la parte superior del Web Part.

```javascript
    return (
      <>
        <div className={[styles.saintsContainer, this.state.styleViewMode].join(' ')}>
          <CommandBar
            items={[]}
            overflowItems={[]}
            farItems={_farItems}
            ariaLabel="Use left and right arrow keys to navigate between commands"
          />
          <Dashboard 
            saints={this.state.saintsFiltered.length}
            bronzeSaints={6}
            silverSaints={6}
            goldSaints={12}
            legendarySaints={6}
            strengthAvg={getAverage(this.state.saintsFiltered)}
          /> 
          <Filter saints={this.state.saintsFiltered} handleFilter={this.FilterSaints} /> 
          <SaintList saints={this.state.saintsFiltered} viewMode={this.state.viewMode}/>
        </div>
      </>
    );
```

Como se puede ver, esta barra de comandos, nos permitirá cambiar entre la vista de tipo lista y la vista de tipo galería.

## ENLACES

[INDEX](./readme.md)

[0.- Development environment](./environment.md)

[1.- SPFx Webpart](./spfx-intro.md)

2.- SPFx Design